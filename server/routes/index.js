const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");
const carCommentRouter = require("./carCommentRouter");

router.use("/users", userRouter);
router.use("/car", carRouter);
router.use("/car-comment", carCommentRouter);

module.exports = router;
