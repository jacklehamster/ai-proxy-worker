import type { } from "openai"

interface AIProxyRequest {
  model: string;
}

interface ChatServer {
  url: string;
}

function getModelConfig(model: string): ChatServer {
  switch (model) {
    case "deepseek-chat":
      return {
        url: "https://api.deepseek.com/chat/completions",
      };
    default:
      return {
        url: "https://api.openai.com/v1/chat/completions",
      };
  }
}

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    if (url.pathname === '/favicon.ico') {
      return Response.redirect("https://ai-proxy.dobuki.net/icon.png");
    }

    if (request.method !== "POST") {
      return new Response("Only POST supported", { status: 405 });
    }
    const body = await request.text();

    const payload: AIProxyRequest = JSON.parse(body);
    const config = getModelConfig(payload.model);

    const response = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body,
    });
    console.log(response);

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
