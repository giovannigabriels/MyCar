const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");

router.use("/users", userRouter);
router.use("/car", carRouter);

module.exports = router;
