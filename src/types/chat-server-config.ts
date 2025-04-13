import { Adapter } from "../adapters/adapter";

export interface ChatServerConfig {
  url: string;
  api_key: string;
  isGemini?: boolean;
  isGrok?: boolean;
  adapter: Adapter;
}
