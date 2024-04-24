require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../../database/db");

const login = (req, res) => {
  const validation = "SELECT * FROM user WHERE email = '" + req.body.email + "'";
  db.query(validation, (err, data) => {
    if (err) {
      return res.status(400).json({ err: "Login error di server" });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, response) => {
        if (err) {
          return res.status(400).json({ err: "Password compare error" });
        }
        if (response) {
          const username = data[0].username;
          const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: "2d" });
          res.cookie("token", token);
          return res.status(200).json({ status: "Success" });
        } else {
          return res.status(400).json({ err: "Password salah" });
        }
      });
    } else {
      return res.status(404).json({ err: "Email tidak ada. Silahkan register" });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ status: "Success" });
};

module.exports = {
  login,
  logout,
};
