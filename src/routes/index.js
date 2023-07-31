const express = require("express");

const router = express.Router();

const userRouter = require("./user.routes");
const folderRouter = require("./folder.routes");

router.use("/users", userRouter);
router.use("/folders", folderRouter);

module.exports = router;
