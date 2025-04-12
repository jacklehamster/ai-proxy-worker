export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    if (url.pathname === '/favicon.ico') {
      return Response.redirect("https://ai-proxy.dobuki.net/icon.png");
    }

    if (request.method !== "POST") {
      return new Response("Only POST supported", { status: 405 });
    }

    const openaiUrl = "https://api.openai.com/v1/chat/completions";
    const body = await request.text();

    const response = await fetch(openaiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body,
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
