import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import axios from "axios";
import "./styles.css";

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

  const getBotResponse = async (message) => {
    const API_TOKEN = "L2CFOBZMUZVRVZH6L6N3OIRKXNNLFL5W"; // Replace with your wit.ai token
    const endpoint = `https://api.wit.ai/message?q=${encodeURIComponent(message)}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    console.log(response);
    const intents = response.data.intents;
    console.log(intents, intents[0].name)
    if (intents && intents[0].name === "location_of_the_business") {
      return "We are located at 123 Main Street, Springfield.";
    } else if (intents && intents[0].name === "business_hours") {
      return "We are open from 9 AM to 5 PM, Monday to Friday.";
    } else {
      return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
  };

  return (
    <div className="app">
      <h1>AI Chatbot</h1>
      <ChatBox messages={messages} />
      <InputBox onSend={handleUserMessage} />
      {loading && <div className="loading">Thinking...</div>}
    </div>
  );
};

export default App;
