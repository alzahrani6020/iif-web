exports.handler = async function handler() {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        ok: true,
        now: new Date().toISOString(),
        runtime: "netlify-function",
        searx: {
          ok: false,
          note: "SearXNG is not bundled. Point your app to a hosted SearXNG via a separate service if needed.",
        },
      },
      null,
      2
    ),
  };
};

