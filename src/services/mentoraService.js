import MentoraEngine from "./mentoraEngine.js";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const mentora = new MentoraEngine(apiKey);

export const askMentora = async (history) => {
  const cleanHistory = history.map(({ role, content }) => ({ role, content }));
  return await mentora.getMentoraResponse(cleanHistory);
};