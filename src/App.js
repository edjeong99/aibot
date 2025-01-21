import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import "./styles.css";

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleUserMessage = (userMessage) => {
    const botResponse = getBotResponse(userMessage);
    setMessages([...messages, { sender: "user", text: userMessage }, { sender: "bot", text: botResponse }]);
  };

  const getBotResponse = (message) => {
    message = message.toLowerCase();
    if (message.includes("location")) {
      return "We are located at 123 Main Street, Springfield.";
    } else if (message.includes("hours") || message.includes("open")) {
      return "We are open from 9 AM to 5 PM, Monday to Friday.";
    } else {
      return "I'm sorry, I didn't understand that. Could you please rephrase?";
    }
  };

  return (
    <div className="app">
      <h1>AI Chatbot</h1>
      <ChatBox messages={messages} />
      <InputBox onSend={handleUserMessage} />
    </div>
  );
};

export default App;
