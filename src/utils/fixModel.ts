export function fixModel(model: string) {
  switch (model) {
    case "deepseek":
      return "deepseek-chat";
    case "openai":
    case "gpt":
      return "gpt-4o-mini";
    case "gemini":
      return "gemini-2.0-flash-lite";
    case "grok":
      return "grok-3-mini";
  }
  return model;
}
