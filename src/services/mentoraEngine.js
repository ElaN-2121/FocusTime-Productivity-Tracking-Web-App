import Groq from "groq-sdk";

class MentoraEngine {
  constructor(apiKey) {
    if (!apiKey) throw new Error("Mentora Engine: API Key is missing.");
    
    this.client = new Groq({ 
      apiKey, 
      dangerouslyAllowBrowser: true 
    });

    this.config = {
      model: "llama-3.1-8b-instant",
      temperature: 0.8, 
    };
  }

  async getMentoraResponse(messages) {
    try {
      const response = await this.client.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `You are Mentora, a warm and encouraging focus companion. 
            Use "we" to show partnership. Follow this exact response hierarchy:

            1. ### Title: Use a friendly H3 title for the main topic.
            2. Paragraph: A short, 1-2 sentence warm introduction.
            3. Bullet Points: Use clear bullet points for advice or steps.
            4. **Bold Emphasis**: Highlight the most positive takeaway in each section.
            5. Encouragement: End with a single, kind sentence.

            Keep sections distinct and easy to scan.` 
          },
          ...messages
        ],
        ...this.config
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      throw new Error("Mentora is currently offline.");
    }
  }
}

export default MentoraEngine;