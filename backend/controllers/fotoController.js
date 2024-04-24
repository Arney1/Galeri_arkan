const { db } = require("../database/db");
const fs = require("fs");

// const fotoGetAll = (req, res) => {
//   const sql = "SELECT * FROM `foto` INNER JOIN user ON foto.user_id = user.id ORDER BY `foto`.`tanggal_unggah` DESC LIMIT 10";
//   db.query(sql, (err, data) => {
//     if (err) {
//         return res.status(400).json({err: "Ambil data gagal"})
//     }
//     return res.status(200).json({data})
//   });
// };

const fotoAdd = (req, res) => {
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
      return res.status(400).json({ err: "Tambah post gagal" });
    }
    const id = data[0].id;
    const sql = "INSERT INTO foto VALUES ('','" + req.body.judul + "','" + req.body.deskripsi + "','" + formDate + "','" + req.file.filename + "','" + id + "')";
    db.query(sql, (err) => {
      if (err) {
        return res.status(400).json({ err: "Tambah post gagal" });
      }
      return res.status(200).json({ status: "Success" });
    });
  });
};

const fotoDelete = (req, res) => {
  fs.unlink("./public/Foto/" + req.body.filename, (err) => {
    if (err) {
      return res.status(400).json({ err: "Eror" });
    }
    const sql = "DELETE FROM foto WHERE `foto`.`id` = " + req.body.id;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Eror" });
      }
      return res.status(200).json({ status: "Success" });
    });
  });
};

const fotoUpdate = (req, res) => {
  console.log(req.body);
  const sql = "UPDATE foto SET judul_foto = '" + req.body.judul + "', deskripsi_foto = '" + req.body.deskripsi + "' WHERE id = " + req.body.id;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).json({ err: err.sqlMessage });
    }
    return res.status(200).json({ status: "Success" });
  });
};

const fotoUpdateFile = (req, res) => {
  fs.unlink("./public/Foto/" + req.body.oldFile, (err) => {
    if (err) {
      return res.status(400).json({ err: "Eror" });
    }
    const sql =
      "UPDATE foto SET judul_foto = '" + req.body.judul + "', deskripsi_foto = '" + req.body.deskripsi + "', lokasi_file = '" + req.file.filename + "' WHERE id = " + req.body.id;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Gagal mengedit foto" });
      }
      return res.status(200).json({ status: "Success" });
    });
  });
};

module.exports = {
  fotoAdd,
  fotoDelete,
  fotoUpdate,
  fotoUpdateFile
};
