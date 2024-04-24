require("dotenv").config();

const bcrypt = require("bcrypt");
const { db } = require("../../database/db");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const salt = Number(process.env.SALT);

const register = (req, res) => {
  const usernameRegex = /^[a-zA-Z0-9.]+$/;
  const validationUsername = req.body.username.match(usernameRegex);
  if (!validationUsername) {
    return res.status(400).json({
      err: "Username hanya boleh memiliki karakter 'a-z', 'A-Z', '0-9', dan '.'",
    });
  }

  const validationUnique =
    "SELECT * FROM user WHERE username = '" + req.body.username + "'";
  db.query(validationUnique, (err, data) => {
    if (err) {
      return res.status(400).json({ err: "Registrasi error" });
    }
    if (data.length > 0) {
      return res.status(400).json({ err: "Username sudah ada" });
    }
    const validationUnique2 = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    db.query(validationUnique2, (err, data) => {
      if (err) return res.status(400).json({ err: "Registrasi error" });
      if (data.length > 0)
        return res.status(400).json({ err: "Email sudah ada" });
      bcrypt.hash(req.body.password.toString(), salt, (err, encrypted) => {
        if (err) {
          return res.status(400).json({ err: "Password hashing error" });
        }
        const sql =
          "INSERT INTO user VALUES ('','" +
          req.body.username +
          "','" +
          req.body.email +
          "','" +
          req.body.namalengkap +
          "','" +
          req.body.alamat +
          "','" +
          encrypted +
          "')";
        db.query(sql, (err) => {
          if (err) {
            return res.status(400).json({ err: "Registrasi error" });
          }
          return res.status(200).json({ status: "Success" });
        });
      });
    });
  });
};

const userEdit = (req, res) => {
  const usernameRegex = /^[a-zA-Z0-9.]+$/;
  const validationUsername = req.body.username.match(usernameRegex);
  if (!validationUsername) {
    return res.status(400).json({
      err: "Username hanya boleh memiliki karakter 'a-z', 'A-Z', '0-9', dan '.'",
    });
  }

  const validationUnique =
    "SELECT * FROM user WHERE username = '" +
    req.body.username +
    "' AND id != " +
    req.body.id;
  db.query(validationUnique, (err, data) => {
    if (err) {
      return res.status(400).json({ err: err.sqlMessage });
    }
    if (data.length > 0) {
      return res.status(400).json({ err: "Username sudah ada" });
    }
    const validationUnique2 = `SELECT * FROM user WHERE email = '${req.body.email}' AND id != ${req.body.id}`;
    db.query(validationUnique2, (err, data) => {
      if (err) return res.status(400).json({ err: "Registrasi error" });
      if (data.length > 0)
        return res.status(400).json({ err: "Email sudah ada" });
      if (req.body.password) {
        bcrypt.hash(req.body.password, salt, (err, encrypted) => {
          if (err) return res.status(400).json({ err: "Error hashing" });
          const sql =
            "UPDATE user SET username = '" +
            req.body.username +
            "', email = '" +
            req.body.email +
            "', nama_lengkap = '" +
            req.body.nama_lengkap +
            "', alamat = '" +
            req.body.alamat +
            "', password = '" +
            encrypted +
            "' WHERE id = " +
            req.body.id;
          db.query(sql, (err) => {
            if (err) return res.status(400).json({ err: "Error" });
            res.clearCookie("token");
            const username = req.body.username;
            const token = jwt.sign({ username }, process.env.JWT_KEY, {
              expiresIn: "2d",
            });
            res.cookie("token", token);
            return res.status(200).json({ status: "Success" });
          });
        });
      } else {
        const sql =
          "UPDATE user SET username = '" +
          req.body.username +
          "', email = '" +
          req.body.email +
          "', nama_lengkap = '" +
          req.body.nama_lengkap +
          "', alamat = '" +
          req.body.alamat +
          "' WHERE id = " +
          req.body.id;
        db.query(sql, (err) => {
          if (err) return res.status(400).json({ err: "Error" });
          res.clearCookie("token");
          const username = req.body.username;
          const token = jwt.sign({ username }, process.env.JWT_KEY, {
            expiresIn: "2d",
          });
          res.cookie("token", token);
          return res.status(200).json({ status: "Success" });
        });
      }
    });
  });
};

const userDelete = (req, res) => {
  const sql1 = `SELECT * FROM `
  const sql = `DELETE FROM user WHERE id = '${req.body.id}'`
}

module.exports = {
  register,
  userEdit,
};
