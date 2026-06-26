import React, { useState } from 'react';
import LumineData from '../lumine_data.json';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Welcome to Lumine. How may I assist your journey today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message to state
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);

    // Processing the bot response
    setTimeout(() => {
      const query = input.toLowerCase();
      let foundResponse = "Lumine values your inquiry. Our concierge is currently looking into that for you.";

      // Scan the imported JSON from lumine_data.json[cite: 1]
      for (let item of LumineData) {
        const keywords = item.Keywords.split(';');
        if (keywords.some(k => query.includes(k.trim().toLowerCase()))) {
          // Select a random response from the list separated by |[cite: 1]
          const possible = item.Responses.split('|');
          foundResponse = possible[Math.floor(Math.random() * possible.length)];
          break;
        }
      }

      setMessages(prev => [...prev, { text: foundResponse, sender: "bot" }]);
    }, 600); 

    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '110px', right: '30px',
      width: '350px', height: '450px', backgroundColor: '#fdfdfb',
      boxShadow: '0 15px 50px rgba(0,0,0,0.2)', borderRadius: '15px',
      display: 'flex', flexDirection: 'column', zIndex: 2000,
      border: '1px solid #eee', overflow: 'hidden', fontFamily: 'serif'
    }}>
      {/* Header with Lumine Branding */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#b8924e', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '700' }}>LUMINE CONCIERGE</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#b8924e', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
      </div>

      {/* Chat History Area */}
      <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: '#fff' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? '#1a1a1a' : '#f4f4f2',
            color: msg.sender === 'user' ? '#fff' : '#1a1a1a',
            padding: '12px 16px', borderRadius: '15px',
            fontSize: '0.85rem', maxWidth: '85%', lineHeight: '1.4',
            borderBottomRightRadius: msg.sender === 'user' ? '2px' : '15px',
            borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '15px'
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div style={{ padding: '15px 20px', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', background: '#fdfdfb' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Inquire about the collection..."
          style={{ flexGrow: 1, border: 'none', outline: 'none', fontSize: '0.85rem', backgroundColor: 'transparent', color: '#333' }}
        />
        <button 
          onClick={handleSend} 
          style={{ background: 'none', border: 'none', color: '#b8924e', fontWeight: '700', cursor: 'pointer', paddingLeft: '10px' }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default Chatbot;