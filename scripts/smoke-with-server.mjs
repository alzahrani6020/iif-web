/**
 * يشغّل خادم التطوير على PORT ثم npm run smoke:html ثم يوقف الخادم.
 * يعمل على Windows و Linux/macOS — للتحقق المحلي دون خطوات يدوية.
 */
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.CHECK_HOST || '127.0.0.1';

function waitForPort(ms = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function tryOnce() {
      const req = http.request(
        { hostname: HOST, port: PORT, path: '/', method: 'GET', timeout: 2000 },
        (res) => {
          res.resume();
          resolve();
        }
      );
      req.on('error', () => {
        if (Date.now() - start > ms) {
          reject(new Error(`Timeout: server did not listen on ${HOST}:${PORT}`));
        } else {
          setTimeout(tryOnce, 200);
        }
      });
      req.on('timeout', () => {
        req.destroy();
        if (Date.now() - start > ms) {
          reject(new Error(`Timeout: server did not listen on ${HOST}:${PORT}`));
        } else {
          setTimeout(tryOnce, 200);
        }
      });
      req.end();
    }
    tryOnce();
  });
}

const child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'dev-server.js')], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, PORT: String(PORT) },
  detached: false,
});

let exiting = false;
let serverReady = false;

child.on('exit', (code) => {
  if (exiting) return;
  if (!serverReady) {
    console.error(
      `dev-server exited before smoke (code ${code}). إن كان المنفذ ${PORT} مستخدماً: أوقف الخادم الآخر أو استخدم PORT=3334 npm run smoke:with-server`
    );
    process.exit(code ?? 1);
  }
});
function shutdown(code) {
  if (exiting) return;
  exiting = true;
  try {
    child.kill('SIGTERM');
  } catch (_) {}
  setTimeout(() => {
    try {
      child.kill('SIGKILL');
    } catch (_) {}
    process.exit(code ?? 0);
  }, 800);
}

process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));

child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

try {
  await waitForPort();
  serverReady = true;
} catch (e) {
  console.error(e.message || e);
  shutdown(1);
}

const smoke = spawn(process.execPath, [path.join(ROOT, 'scripts', 'smoke-html-check.mjs')], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, PORT: String(PORT), CHECK_HOST: HOST },
});

smoke.on('close', (code) => {
  shutdown(code ?? 0);
});
