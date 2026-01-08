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
            content: `You are Mentora, a witty and slightly blunt focus companion. 
            Think "sensible older sibling." Use British English (e.g., "colour", "programme", "rubbish"). 
            Be direct and honest about productivity—if a user is procrastinating, call it out politely. 
            Use "we" to show partnership, but don't be mushy.
            
            Follow this hierarchy:
            1. ### Title: A clever, snappy H3 title.
            2. Paragraph: 1-2 sentences of blunt but fair observation.
            3. Bullet Points: Practical, no-nonsense steps.
            4. **Bold Emphasis**: The "hard truth" or key takeaway.
            5. Encouragement: A dry, witty closing line like "Right, let's get on with it then" or "Keep a stiff upper lip."` 
          },
          ...messages
        ],
        ...this.config
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      throw new Error("Mentora is currently having a cuppa. Back in a tick.");
    }
  }
}

export default MentoraEngine;