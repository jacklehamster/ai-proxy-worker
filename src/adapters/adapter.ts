import { ChatCompletion } from "openai/resources";
import { AIProxyRequest } from "..";

export interface Adapter {
  transformRequest(payload: AIProxyRequest): any;
  transformToOpenAIResponse(response: any, model: string): ChatCompletion;
}

export const DEFAULT_ADAPTER: Adapter = {
  transformRequest: payload => payload,
  transformToOpenAIResponse: response => response,
}
