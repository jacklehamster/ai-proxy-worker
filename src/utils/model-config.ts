import { DEFAULT_ADAPTER } from "../adapters/adapter";
import { GEMINI_ADAPTER } from "../adapters/geminiAdapter";
import { ChatServerConfig } from "../types/chat-server-config";
import { EnvironmentVariables } from "../types/environment-vars";

export function isModelGemini(model: string) {
  return model.includes("gemini");
}

export function isModelGrok(model: string) {
  return model.includes("grok");
}

export function getModelConfig(model: string, env: EnvironmentVariables): ChatServerConfig {
  if (isModelGemini(model)) {
    return {
      url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
      api_key: "",
      isGemini: true,
      adapter: GEMINI_ADAPTER,
    };
  }
  if (isModelGrok(model)) {
    return {
      url: `https://api.x.ai/v1/chat/completions`,
      api_key: env.GROK_API_KEY,
      isGrok: true,
      adapter: DEFAULT_ADAPTER, //  grok model seems to match OpenAI
    }
  }
  switch (model) {
    case "deepseek-chat":
      return {
        url: "https://api.deepseek.com/chat/completions",
        api_key: env.DEEPSEEK_API_KEY,
        adapter: DEFAULT_ADAPTER,
      };
    default:
      return {
        url: "https://api.openai.com/v1/chat/completions",
        api_key: env.OPENAI_API_KEY,
        adapter: DEFAULT_ADAPTER,
      };
  }
}
