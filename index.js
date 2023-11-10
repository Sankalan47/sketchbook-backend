const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const httpServer = createServer(app);

const isDev = app.settings.env === "development";
const URL = isDev
  ? "http://localhost:3000"
  : "https://sketchbook-eta-coral.vercel.app";

app.use(cors({ origin: URL }));

const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: URL,
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });
  socket.on("drawPath", (arg) => {
    socket.broadcast.emit("drawPath", arg);
  });
  socket.on("config", (arg) => {
    socket.broadcast.emit("config", arg);
  });
});

httpServer.listen(8080);
