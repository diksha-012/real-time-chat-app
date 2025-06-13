import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chat-backend-0474.onrender.com");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("📥 New message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ border: "1px solid gray", height: "200px", overflowY: "scroll", marginBottom: "10px", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index}>💬 {msg}</div>
        ))}
      </div>
      <input
        type="text"
        id="chat-message"
        name="chatMessage"
        value={message}
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
