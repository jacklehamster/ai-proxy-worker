import { fixModel } from "./utils/fixModel";
import { EnvironmentVariables } from "./types/environment-vars";
import { getModelConfig } from "./utils/model-config";
import type { ChatCompletion } from "openai/resources/chat/completions";

export interface AIProxyRequest {
  model: string;
  messages: { role: string; content: string }[];
}

export default {
  async fetch(request: Request, env: EnvironmentVariables) {
    const url = new URL(request.url);

    if (url.pathname === "/favicon.ico") {
      return Response.redirect("https://ai-proxy.dobuki.net/icon.png");
    }

    if (request.method !== "POST") {
      return new Response("Only POST supported", { status: 405 });
    }

    const payload: AIProxyRequest = await request.json();
    payload.model = fixModel(payload.model);
    const config = getModelConfig(payload.model, env);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (config.api_key) {
      headers["Authorization"] = `Bearer ${config.api_key}`;
    }

    const requestBody = JSON.stringify(config.adapter.transformRequest(payload));

    const response = await fetch(config.url, {
      method: "POST",
      headers,
      body: requestBody,
    });
    const responseText = await response.text();

    const result = JSON.parse(responseText);

    const finalOutput: ChatCompletion = config.adapter.transformToOpenAIResponse(result, payload.model);

    return new Response(JSON.stringify(finalOutput, null, 1), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
