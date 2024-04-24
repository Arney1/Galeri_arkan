const { db } = require("../database/db");

const likeAdd = (req, res) => {
  const d = new Date();
  var month = "" + (d.getMonth() + 1);
  var year = d.getFullYear();
  var day = "" + d.getDate();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  const formDate = [year, month, day].join("-");
  const sql1 = "SELECT * FROM user WHERE username = '" + req.username + "'";
  db.query(sql1, (err, data) => {
    if (err) {
      return res.status(400).json({ err: "Anda belum login" });
    }
    const id = data[0].id;
    const sql = "INSERT INTO like_foto VALUES ('','" + req.body.id + "','" + id + "','" + formDate + "')";
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Tambah like gagal" });
      }
      return res.status(200).json({ status: "Success" });
    });
  });
};

const likeDelete = (req, res) => {
  const sql = "DELETE FROM like_foto WHERE `like_foto`.`id` = " + req.body.id;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).json({ err: "Gagal menghapus like" });
    }
    return res.status(200).json({ status: "Success" });
  });
};

module.exports = {
  likeAdd,
  likeDelete,
};
