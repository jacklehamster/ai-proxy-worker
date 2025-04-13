// geminiAdapter.ts

import { ChatCompletion } from "openai/resources";
import { AIProxyRequest } from "../types/ai-proxy-request";
import { Adapter } from "./adapter";

// Convert OpenAI-style messages to Gemini format
function transformToGeminiFormat(payload: AIProxyRequest): any {
  return {
    contents: payload.messages?.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  };
}

// Convert Gemini response back to OpenAI-style format
function transformGeminiToOpenAIFormat(geminiResponse: any, model: string): ChatCompletion {
  return {
    id: "gemini-proxy",
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text || "",
          refusal: null,
        },
        logprobs: null,
        finish_reason: "stop",
      },
    ],
    usage: {
      completion_tokens: 0,
      prompt_tokens: 0,
      total_tokens: 0,
    }, // Gemini doesn’t report usage (yet)
  };
}

export const GEMINI_ADAPTER: Adapter = {
  transformRequest: transformToGeminiFormat,
  transformToOpenAIResponse: transformGeminiToOpenAIFormat,
}
