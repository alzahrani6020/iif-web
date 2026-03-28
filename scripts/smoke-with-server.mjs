/**
 * يشغّل خادم التطوير على PORT ثم npm run smoke:html ثم يوقف الخادم.
 * يعمل على Windows و Linux/macOS — للتحقق المحلي دون خطوات يدوية.
 *
 * إن كان المنفذ مشغولاً بخادم ليس dev-server الحالي (مثلاً نسخة قديمة)،
 * يُشغَّل خادم مؤقت على أول منفذ حرّ بعده حتى لا يفشل الفحص بـ 404.
 */
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORT_ENV = Number(process.env.PORT) || 3333;
const HOST = process.env.CHECK_HOST || '127.0.0.1';

function isServerUpOnPort(port, timeoutMs = 800) {
  return new Promise((resolve) => {
    const req = http.request(
      { hostname: HOST, port, path: '/', method: 'GET', timeout: timeoutMs },
      (res) => {
        res.resume();
        resolve(true);
      }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

/** يتعرّف على dev-server الحالي عبر اختصار اللوحة (لا يُعتمد على / فقط). */
function isOurDevServer(port) {
  return new Promise((resolve) => {
    const req = http.request(
      { hostname: HOST, port, path: '/admin-standalone', method: 'GET', timeout: 2000 },
      (res) => {
        res.resume();
        const loc = res.headers.location || '';
        resolve(res.statusCode === 302 && loc.includes('admin-standalone.html'));
      }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

function waitForPort(port, ms = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function tryOnce() {
      const req = http.request(
        { hostname: HOST, port, path: '/', method: 'GET', timeout: 2000 },
        (res) => {
          res.resume();
          resolve();
        }
      );
      req.on('error', () => {
        if (Date.now() - start > ms) {
          reject(new Error(`Timeout: server did not listen on ${HOST}:${port}`));
        } else {
          setTimeout(tryOnce, 200);
        }
      });
      req.on('timeout', () => {
        req.destroy();
        if (Date.now() - start > ms) {
          reject(new Error(`Timeout: server did not listen on ${HOST}:${port}`));
        } else {
          setTimeout(tryOnce, 200);
        }
      });
      req.end();
    }
    tryOnce();
  });
}

let child = null;
let effectivePort = PORT_ENV;

if (await isServerUpOnPort(PORT_ENV)) {
  if (await isOurDevServer(PORT_ENV)) {
    effectivePort = PORT_ENV;
    console.warn(`[smoke] استخدام خادم قيد التشغيل على ${HOST}:${effectivePort}`);
  } else {
    console.warn(
      `[smoke] المنفذ ${PORT_ENV} مشغول بخادم ليس dev-server الحالي؛ تشغيل مؤقت على منفذ آخر.`
    );
    let found = false;
    for (let p = PORT_ENV + 1; p <= PORT_ENV + 30; p++) {
      if (!(await isServerUpOnPort(p))) {
        effectivePort = p;
        found = true;
        child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'dev-server.js')], {
          cwd: ROOT,
          stdio: 'inherit',
          env: { ...process.env, PORT: String(p) },
          detached: false,
        });
        break;
      }
    }
    if (!found) {
      console.error(
        `[smoke] لم يُعثر على منفذ حرّ بين ${PORT_ENV + 1} و ${PORT_ENV + 30}. أوقف الخادم على ${PORT_ENV} أو عيّن PORT=...`
      );
      process.exit(1);
    }
  }
} else {
  effectivePort = PORT_ENV;
  child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'dev-server.js')], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, PORT: String(PORT_ENV) },
    detached: false,
  });
}

let exiting = false;
let serverReady = false;

if (child) {
  child.on('exit', (code) => {
    if (exiting) return;
    if (!serverReady) {
      console.error(
        `dev-server exited before smoke (code ${code}). إن كان المنفذ ${effectivePort} مستخدماً: أوقف الخادم الآخر أو استخدم PORT=3334 npm run smoke:with-server`
      );
      process.exit(code ?? 1);
    }
  });
}
function shutdown(code) {
  if (exiting) return;
  exiting = true;
  try {
    child && child.kill('SIGTERM');
  } catch (_) {}
  setTimeout(() => {
    try {
      child && child.kill('SIGKILL');
    } catch (_) {}
    process.exit(code ?? 0);
  }, 800);
}

process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));

if (child) {
  child.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
}

try {
  if (child) {
    await waitForPort(effectivePort);
  }
  serverReady = true;
} catch (e) {
  console.error(e.message || e);
  shutdown(1);
}

const smoke = spawn(process.execPath, [path.join(ROOT, 'scripts', 'smoke-html-check.mjs')], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, PORT: String(effectivePort), CHECK_HOST: HOST },
});

smoke.on('close', (code) => {
  shutdown(code ?? 0);
});
