const { db } = require("../database/db");

const komentarAdd = (req, res) => {
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
    const sql = "INSERT INTO komentar_foto VALUES ('','" + req.body.id + "','" + id + "','" + req.body.isi + "','" + formDate + "')";
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Tambah komentar gagal" });
      }
      return res.status(200).json({ status: "Success" });
    });
  });
};

const komentarDelete = (req, res) => {
  const sql = "DELETE FROM komentar_foto WHERE `komentar_foto`.`id` = " + req.body.id;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).json({ err: "Gagal menghapus komentar" });
    }
    return res.status(200).json({ status: "Success" });
  });
};

const komentarUpdate = (req, res) => {
  const sql = "UPDATE komentar_foto SET isi_komentar = '" + req.body.isi + "' WHERE id = " + req.body.id;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).json({ err: "Gagal mengedit komentar" });
    }
    return res.status(200).json({ status: "Success" });
  });
};

module.exports = {
  komentarAdd,
  komentarDelete,
  komentarUpdate,
};
