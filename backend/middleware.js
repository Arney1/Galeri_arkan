require("dotenv").config();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ err: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ err: "Token does not match" });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Foto");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${req.username}.jpg`);
  },
});

const upload = multer({ storage });

module.exports = {
  verifyUser,
  upload,
};
