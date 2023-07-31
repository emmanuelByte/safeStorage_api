const Folder = require("../models/folder.model");

async function createFolder(req, res) {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ message: "name is required", success: false });
    const user = req.user;
    const existingFolderWithSameName = await Folder.findOne({
      userId: user._id,
      name,
    });
    if (existingFolderWithSameName) {
      return res
        .status(400)
        .json({ message: "Folder already exist", success: false });
    }
    await Folder.create({
      name,
      userId: user._id,
    });
    return res.status(201).json({ message: "Folder created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getFolders(req, res) {
  try {
    const user = req.user;
    const folders = await Folder.find({ userId: user._id });
    res.status(200).json({ folders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getFolder(req, res) {
  try {
    const { folderId } = req.params;
    const user = req.user;
    const folder = await Folder.findOne({ _id: folderId, userId: user._id });
    if (!folder) {
      return res.status(400).json({ message: "Folder not found" });
    }

    res.status(200).json({ folder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function renameFolder(req, res) {
  try {
    const { folderId } = req.params;
    const { name } = req.body;
    const user = req.user;
    if (!name)
      return res
        .status(400)
        .json({ message: "name is required", success: false });
    let folder = await Folder.findOne({ _id: folderId, userId: user._id });
    if (!folder) {
      return res.status(400).json({ message: "Folder not found" });
    }
    folder = await Folder.findOneAndUpdate(
      { _id: folderId, userId: user._id },
      { name },
      {
        new: true,
      }
    );

    res.status(200).json({ data: folder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteFolder(req, res) {
  try {
    const { folderId } = req.params;
    const user = req.user;
    const folder = await Folder.findOne({ _id: folderId, userId: user._id });
    if (!folder) {
      return res.status(400).json({ message: "Folder not found" });
    }
    await Folder.deleteOne({ _id: folderId, userId: user._id });
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function addFileToFolder(req, res) {
  try {
    const { id } = req.params;
    const { fileId } = req.body;
    const user = req.user;
    const folder = await Folder.findOne({ _id: id, userId: user._id });
    if (!folder) {
      return res.status(400).json({ message: "Folder not found" });
    }
    await Folder.updateOne(
      { _id: id, userId: user._id },
      {
        $push: {
          files: fileId,
        },
      }
    );
    res.status(200).json({ message: "File added to folder successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createFolder,
  getFolders,
  getFolder,
  deleteFolder,
  addFileToFolder,
  renameFolder,
};
