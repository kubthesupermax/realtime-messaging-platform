const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Trust Railway's proxy
app.set("trust proxy", 1);

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

// Socket.io connection handling
io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  console.log(`✅ User connected: ${id}`);

  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    console.log(`📨 Message from ${id} to ${recipients.join(", ")}: ${text}`);
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`❌ User disconnected: ${id}, Reason: ${reason}`);
  });

  socket.on("error", (error) => {
    console.error(`⚠️ Socket error for ${id}:`, error);
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", connections: io.engine.clientsCount });
});

// Serve React app for all other routes (FIXED - use /.* instead of *)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
