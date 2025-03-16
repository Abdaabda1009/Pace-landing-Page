import replicate from "replicate";


export const generateArticle = async (prompt: string) => {
  return await replicate.run("meta/meta-llama-3-8b-instruct", {
    input: {
      prompt: `${prompt} Include charts, financial metrics (ROI, CAGR, NPV), and regulatory considerations.`,
      max_new_tokens: 2048,
      temperature: 0.6,
      top_p: 0.9,
      system_prompt:
        "You are a certified financial analyst with 20 years experience in wealth management and market forecasting.",
    },
  });
};

export const generateImage = async (prompt: string) => {
  return await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: `${prompt} Clean professional corporate style with financial charts, currency symbols, and data visualizations`,
        num_outputs: 1,
        width: 1280,
        height: 720,
        negative_prompt: "cartoonish, blurry, informal, childish, unrealistic",
      },
    }
  );
};
