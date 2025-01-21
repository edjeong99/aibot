import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";

import "./styles.css";
import getBotResponse from "./util/getBotResponse";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserMessage = async (userMessage) => {
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const botResponse = await getBotResponse(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I couldn't process your request." }]);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="app">
      <h1>AI Chatbot</h1>
      <ChatBox messages={messages} />
      <InputBox onSend={handleUserMessage} />
      {loading && <div className="loading">Thinking...</div>}
    </div>
  )
};

export default App;
