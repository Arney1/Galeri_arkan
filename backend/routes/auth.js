const express = require("express");
const {
  register,
  userEdit,
} = require("../controllers/auth/registerController");
const { login, logout } = require("../controllers/auth/loginController");
const { verifyUser } = require("../middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/", verifyUser, userEdit);

module.exports = router;
