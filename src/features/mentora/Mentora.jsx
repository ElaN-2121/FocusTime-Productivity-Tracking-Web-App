import React, { useState, useEffect, useRef } from "react";
import { summarizeNoteAI } from "../../services/noteService"; 
import "../../styles/mentora.css";

export default function Mentora() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Mentora. How can I help you reach your focus goals today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await summarizeNoteAI(input); 
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mentora-page">
      <div className="mentora-chat-container">
        
        {/* NEW: Chat Header */}
        <header className="mentora-header">
          <div className="status-indicator"></div>
          <h2>Mentora AI Guide</h2>
        </header>

        <div className="mentora-chat-window">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble-wrapper ${m.role}`}>
              <div className={`chat-bubble ${m.role}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble-wrapper assistant">
              <div className="chat-bubble assistant">
                <span className="typing-loader">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="mentora-input-wrapper">
          <div className="mentora-input-bar">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
            />
            {/* NEW: Round Send Button */}
            <button onClick={handleSend} className="btn-send" title="Send Message">
               ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}