import React from "react";

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.sender === "user" ? "You: " : "Bot: "}
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
