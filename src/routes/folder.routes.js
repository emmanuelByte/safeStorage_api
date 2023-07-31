const express = require("express");
const { verifyAuthTokenMiddleware } = require("../middleware/authenticate");
const {
  createFolder,
  getFolders,
  getFolder,
  renameFolder,
  addFileToFolder,
  deleteFolder,
} = require("../controller/folder.controller");

const folderRouter = express.Router();
// GET
folderRouter.get("/all", verifyAuthTokenMiddleware, getFolders);
folderRouter.get("/:folderId", verifyAuthTokenMiddleware, getFolder); // End of GET Request

// PUT
folderRouter.put("/addFile", verifyAuthTokenMiddleware, addFileToFolder);
folderRouter.put("/:folderId", verifyAuthTokenMiddleware, renameFolder); // End Of PUT Request

// DELETE
folderRouter.delete("/:folderId", verifyAuthTokenMiddleware, deleteFolder);

// POST
folderRouter.post("/create", verifyAuthTokenMiddleware, createFolder);

module.exports = folderRouter;
