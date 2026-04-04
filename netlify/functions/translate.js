const http = require("http");
const https = require("https");

function json(statusCode, obj, headers = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
    body: JSON.stringify(obj, null, 2),
  };
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": event.headers && event.headers["access-control-request-headers"] ? event.headers["access-control-request-headers"] : "*",
        "Cache-Control": "no-store",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method Not Allowed" });
  }

  const upstreamRaw = String(process.env.IIF_TRANSLATE_URL || "").trim();
  if (!upstreamRaw) {
    return json(501, {
      ok: false,
      error: "Translation is not configured for hosting.",
      howToFix: "Set Netlify env var IIF_TRANSLATE_URL to your hosted translator base URL (e.g. https://translator.example.com).",
    });
  }

  let upstream;
  try {
    upstream = new URL(upstreamRaw);
  } catch {
    return json(500, { ok: false, error: "Invalid IIF_TRANSLATE_URL" });
  }

  const isHttps = upstream.protocol === "https:";
  const mod = isHttps ? https : http;
  const port = Number(upstream.port) || (isHttps ? 443 : 80);
  const timeoutMs = Number(process.env.IIF_TRANSLATE_TIMEOUT_MS || 180000);

  const body = event.body || "";
  const bodyBuf = event.isBase64Encoded ? Buffer.from(body, "base64") : Buffer.from(body, "utf8");

  return await new Promise((resolve) => {
    const preq = mod.request(
      {
        hostname: upstream.hostname,
        port,
        path: "/translate",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": String(bodyBuf.length),
          "User-Agent": "iif-fund-demo-netlify-translate/1.0",
          Accept: "application/json",
          Host: upstream.hostname,
        },
        timeout: timeoutMs,
      },
      (pres) => {
        const chunks = [];
        pres.on("data", (c) => chunks.push(c));
        pres.on("end", () => {
          const out = Buffer.concat(chunks).toString("utf8");
          resolve({
            statusCode: pres.statusCode || 200,
            headers: {
              "Content-Type": String(pres.headers["content-type"] || "application/json; charset=utf-8"),
              "Cache-Control": "no-store",
              "Access-Control-Allow-Origin": "*",
              "X-IIF-Translate-Upstream": upstream.origin,
            },
            body: out,
          });
        });
      }
    );
    preq.on("timeout", () => {
      preq.destroy();
      resolve(json(504, { ok: false, error: "Translate timeout" }, { "X-IIF-Translate-Upstream": upstream.origin }));
    });
    preq.on("error", (e) => resolve(json(502, { ok: false, error: e.message }, { "X-IIF-Translate-Upstream": upstream.origin })));
    preq.end(bodyBuf);
  });
};

