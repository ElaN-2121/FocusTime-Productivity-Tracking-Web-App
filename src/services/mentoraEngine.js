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

            1. ### Title: A friendly H3 title for the topic.
            2. Paragraph: A short, 1-2 sentence warm introduction.
            3. Bullet Points: Clear advice or steps.
            4. **Bold Emphasis**: Highlight positive takeaways.
            5. Encouragement: End with a kind closing sentence.` 
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