const MINIMAL_AI_MODELS = {
  DEEPSEEK: "deepseek-chat",
  OPENAI: "gpt-4o-mini",
  GEMINI: "gemini-2.0-flash-lite",
  GROK: "grok-3-mini",
};

export function fixModel(model: string) {
  switch (model) {
    case "random":
      const models = Object.values(MINIMAL_AI_MODELS);
      return models[Math.floor(Math.random() * models.length)];
    case "deepseek":
      return MINIMAL_AI_MODELS.DEEPSEEK;
    case "openai":
    case "gpt":
      return MINIMAL_AI_MODELS.OPENAI;
    case "gemini":
      return MINIMAL_AI_MODELS.GEMINI;
    case "grok":
      return MINIMAL_AI_MODELS.GROK;
  }
  return model;
}
