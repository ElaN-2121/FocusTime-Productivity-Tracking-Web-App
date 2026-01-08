import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { askMentora } from "../../services/mentoraService.js"; 
import "../../styles/mentora.css";

export default function Mentora() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "### Welcome! \n\nHi there! I'm **Mentora**. I'm so happy to help you find your focus today. What's on your mind?" }
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
    const updatedHistory = [...messages, userMsg];
    
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await askMentora(updatedHistory);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm so sorry, I'm having a little trouble connecting. Let's try again in a moment!" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mentora-page">
      <div className="mentora-chat-container">
        <header className="mentora-header">
          <div className="status-indicator"></div>
          <h2>Mentora</h2>
        </header>

        <div className="mentora-chat-window">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble-wrapper ${m.role}`}>
              <div className={`chat-bubble ${m.role}`}>
                {m.role === "assistant" ? (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble-wrapper assistant">
              <div className="chat-bubble assistant">
                <span className="typing-loader">Mentora is thinking...</span>
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
              placeholder="Tell Mentora what's on your mind..."
            />
            <button onClick={handleSend} className="btn-send">➔</button>
          </div>
        </div>
      </div>
    </div>
  );
}