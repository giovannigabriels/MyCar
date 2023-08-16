const express = require("express");
const router = express.Router();
const userRouter = require('./userRouter')

router.use("/users", userRouter);
// router.use("/pub/car", itemRouter);

module.exports = router;
