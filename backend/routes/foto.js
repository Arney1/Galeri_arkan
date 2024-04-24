const express = require("express");
const { fotoAdd, fotoDelete, fotoUpdate, fotoUpdateFile } = require("../controllers/fotoController");
const { verifyUser, upload } = require("../middleware");

const router = express.Router();

router.post("/", verifyUser, upload.single("file"), fotoAdd);
router.delete("/", verifyUser, fotoDelete);
router.patch("/", verifyUser, fotoUpdate);
router.patch("/file", verifyUser, upload.single("file"), fotoUpdateFile);

module.exports = router;
