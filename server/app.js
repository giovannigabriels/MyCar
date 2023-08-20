const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cron = require("node-cron");
const errorHandler = require("./middleware/errorHandler");
const Controller = require("./controllers/cronController");
const port = 3000;
const http = require("http");
const socketIo = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

//cron job yang berjalan setiap hari pukul 00:00 AM.
cron.schedule("0 0 * * *", async () => {
  await Controller.cronJob();
});

app.use(errorHandler);

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

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
