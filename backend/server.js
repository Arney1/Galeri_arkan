require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { db } = require("./database/db");

// middleware
const { verifyUser } = require("./middleware");

// routes
const authRoutes = require("./routes/auth");
const fotoRoutes = require("./routes/foto");
const mainRoutes = require("./routes/main");
const likeRoutes = require("./routes/like");
const komentarRoutes = require("./routes/komentar");

const salt = 10;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
//   });

// routes
app.use("/api/auth/", authRoutes);
app.use("/api/foto/", fotoRoutes);
app.use("/api/main/", mainRoutes);
app.use("/api/like/", likeRoutes);
app.use("/api/komentar/", komentarRoutes);

// middleware
// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(400).json({ err: "You are not authenticated" });
//   } else {
//     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(400).json({ err: "Token does not match" });
//       } else {
//         req.username = decoded.username;
//         next();
//       }
//     });
//   }
// };

// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// app.post("/register", (req, res) => {
//   bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
//     if (err) {
//       return res.status(400).json({ err: "Password hashing error" });
//     }
//     const sql1 = "SELECT * FROM user WHERE username = '" + req.body.username + "'";
//     db.query(sql1, (err, data) => {
//       if (err) {
//         return res.status(400).json({ err: "Registrasi error" });
//       }
//       if (data.length > 0) {
//         return res.status(400).json({ err: "Username sudah ada" });
//       }
//       const sql = "INSERT INTO user VALUES ('','" + req.body.username + "','" + req.body.email + "','" + req.body.namalengkap + "','" + req.body.alamat + "','" + hash + "')";
//       db.query(sql, (err, data) => {
//         if (err) {
//           return res.status(400).json({ err: "Registrasi error" });
//         }
//         return res.status(200).json({ status: "Success" });
//       });
//     });
//   });
// });

// app.post("/login", (req, res) => {
//   const sql = "SELECT * FROM user WHERE email = '" + req.body.email + "'";
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.status(400).json({ err: "Login error di server" });
//     }
//     if (data.length > 0) {
//       bcrypt.compare(req.body.password, data[0].password, (err, response) => {
//         if (err) {
//           return res.status(400).json({ err: "Password compare error" });
//         }
//         if (response) {
//           const username = data[0].username;
//           const token = jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: "2d" });
//           res.cookie("token", token);
//           return res.status(200).json({ status: "Success" });
//         } else {
//           return res.status(400).json({ err: "Password salah" });
//         }
//       });
//     } else {
//       return res.status(404).json({ err: "Email tidak ada. Silahkan register" });
//     }
//   });
// });

app.get("/", verifyUser, (req, res) => {
  return res.status(200).json({ status: "Success", username: req.username });
});

// app.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   return res.status(200).json({ status: "Success" });
// });

// db.then(() => {
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
// }).catch((err) => {
//   console.log(err);
// });
