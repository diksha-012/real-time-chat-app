const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors()); // Enable CORS

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React frontend
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🔌 New client connected");

  socket.on("send_message", (data) => {
    console.log("📨 Message received:", data);
    io.emit("receive_message", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("✅ Server listening on port 5000");
});
