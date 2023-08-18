const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cron = require("node-cron");
const errorHandler = require("./middleware/errorHandler");
const Controller = require("./controllers/cronController");
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

//cron job yang berjalan setiap hari pukul 00:00 AM.
cron.schedule("0 0 * * *", async () => {
  await Controller.cronJob();
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
