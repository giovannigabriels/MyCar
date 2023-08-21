const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cron = require("node-cron");
const errorHandler = require("./middleware/errorHandler");
const Controller = require("./controllers/cronController");
const http = require("http");
const socketIo = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("comment", (comment) => {
    console.log("Received comment:", comment);
    io.emit("comment", comment);
  });
});

// cron job yang berjalan setiap hari pukul 00:00 AM.
cron.schedule("0 0 * * *", async () => {
  await Controller.cronJob();
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
