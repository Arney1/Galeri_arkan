const { db } = require("../database/db");

const home = (req, res) => {
  if (req.body.username) {
    const sql1 =
      "SELECT * FROM user WHERE username = '" + req.body.username + "'";
    db.query(sql1, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Anda Belum Login" });
      }
      const id = data[0].id;
      const sql =
        "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id GROUP BY foto.id ORDER BY `foto`.`tanggal_unggah` DESC LIMIT " +
        req.body.limit;
      db.query(sql, (err, data) => {
        if (err) {
          return res.status(400).json({ err: "Ambil data gagal" });
        }
        const fotoId = [];
        for (const dat of data) {
          fotoId.push(dat.id);
        }
        const fotoIds = fotoId.join(", ");
        if (fotoIds) {
          const sql2 =
            "SELECT * FROM like_foto WHERE foto_id IN (" +
            fotoIds +
            ") AND user_id = " +
            id;
          db.query(sql2, (err, data2) => {
            if (err) {
              return res.status(400).json({ err: "Ambil data gagal" });
            }
            const sql3 =
              "SELECT foto.id, COUNT(komentar_foto.id) AS comments FROM foto LEFT JOIN komentar_foto ON komentar_foto.foto_id = foto.id WHERE foto.id IN (" +
              fotoIds +
              ") GROUP BY foto.id;";
            db.query(sql3, (err, data3) => {
              if (err) {
                return res.status(400).json({ err: "Ambil data gagal" });
              }
              const sql4 = "SELECT COUNT(*) AS fotoCount FROM foto";
              db.query(sql4, (err, data4) => {
                if (err) {
                  return res.status(400).json({ err: "Ambil data gagal" });
                }
                return res
                  .status(200)
                  .json({ data, data2, data3, data4: data4[0] });
              });
            });
          });
        } else {
          return res.status(200).json({ data });
        }
      });
    });
  } else {
    const sql =
      "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id GROUP BY foto.id ORDER BY `foto`.`tanggal_unggah` ASC LIMIT " +
      req.body.limit;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Ambil data gagal" });
      }
      const fotoId = [];
      for (const dat of data) {
        fotoId.push(dat.id);
      }
      const fotoIds = fotoId.join(", ");
      if (fotoIds) {
        const sql3 =
          "SELECT foto.id, COUNT(komentar_foto.id) AS comments FROM foto LEFT JOIN komentar_foto ON komentar_foto.foto_id = foto.id WHERE foto.id IN (" +
          fotoIds +
          ") GROUP BY foto.id;";
        db.query(sql3, (err, data3) => {
          if (err) {
            return res.status(400).json({ err: "Ambil data gagal" });
          }
          const sql4 = "SELECT COUNT(*) AS fotoCount FROM foto";
          db.query(sql4, (err, data4) => {
            if (err) {
              return res.status(400).json({ err: "Ambil data gagal" });
            }
            return res.status(200).json({ data, data3, data4: data4[0] });
          });
        });
      } else {
        return res.status(200).json({ data });
      }
    });
  }
};

const foto = (req, res) => {
  if (req.body.username) {
    const sql1 =
      "SELECT * FROM user WHERE username = '" + req.body.username + "'";
    db.query(sql1, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Anda belum login" });
      }
      const id = data[0].id;
      const sql =
        "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id WHERE foto.id = " +
        req.body.id;
      db.query(sql, (err, data) => {
        if (err) {
          return res.status(400).json({ err: "Ambil data gagal" });
        }
        if (!data[0].id) {
          return res.status(404).json({ err: "Foto tidak ditemukan" });
        }
        const sql2 =
          "SELECT * FROM like_foto WHERE foto_id = " +
          data[0].id +
          " AND user_id = " +
          id;
        db.query(sql2, (err, data2) => {
          if (err) {
            return res.status(400).json({ err: "Ambil data gagal" });
          }
          const sql3 =
            "SELECT komentar_foto.*, user.username FROM komentar_foto LEFT JOIN user ON komentar_foto.user_id = user.id WHERE foto_id = " +
            data[0].id +
            " AND user_id != " +
            id +
            " ORDER BY komentar_foto.tanggal_komentar DESC LIMIT " +
            req.body.commentLimit;
          db.query(sql3, (err, data3) => {
            if (err) {
              return res.status(400).json({ err: "Ambil data gagal" });
            }
            const sql4 =
              "SELECT komentar_foto.*, user.username FROM komentar_foto LEFT JOIN user ON komentar_foto.user_id = user.id WHERE foto_id = " +
              data[0].id +
              " AND user_id = " +
              id +
              " ORDER BY komentar_foto.tanggal_komentar DESC";
            db.query(sql4, (err, data4) => {
              if (err) {
                return res.status(400).json({ err: "Ambil data gagal" });
              }
              const sql5 =
                "SELECT COUNT(*) AS comments FROM komentar_foto WHERE foto_id = " +
                data[0].id;
              db.query(sql5, (err, data5) => {
                if (err) {
                  return res.status(400).json({ err: "Ambil data gagal" });
                }
                return res
                  .status(200)
                  .json({ data, data2, data3, data4, data5 });
              });
            });
          });
        });
      });
    });
  } else {
    const sql =
      "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id WHERE foto.id = " +
      req.body.id;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Ambil data gagal" });
      }
      const sql3 =
        "SELECT komentar_foto.*, user.username FROM komentar_foto LEFT JOIN user ON komentar_foto.user_id = user.id WHERE foto_id = " +
        data[0].id +
        " ORDER BY komentar_foto.tanggal_komentar DESC LIMIT " +
        req.body.commentLimit;
      db.query(sql3, (err, data3) => {
        if (err) {
          return res.status(400).json({ err: "Ambil data gagal" });
        }
        const sql5 =
          "SELECT COUNT(*) AS comments FROM komentar_foto WHERE foto_id = " +
          data[0].id;
        db.query(sql5, (err, data5) => {
          if (err) {
            return res.status(400).json({ err: "Ambil data gagal" });
          }
          return res.status(200).json({ data, data3, data5 });
        });
      });
    });
  }
};

const profile = (req, res) => {
  if (req.body.username) {
    const sql1 =
      "SELECT * FROM user WHERE username = '" + req.body.username + "'";
    db.query(sql1, (err, data) => {
      if (err) {
        return res.status(400).json({ err: "Anda Belum Login" });
      }

      const id = data[0].id;
      const sql4 =
        "SELECT * FROM user WHERE username = '" +
        req.body.profileUsername +
        "'";
      db.query(sql4, (err, data4) => {
        if (err) {
          return res.status(400).json({ err: "Ambil data gagal" });
        }
        if (data4.length == 0) {
          return res.status(404).json({ err: "Profil tidak ditemukan" });
        }
        const profileId = data4[0].id;
        const sql =
          "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id WHERE user.id = '" +
          profileId +
          "' GROUP BY foto.id ORDER BY `foto`.`tanggal_unggah` DESC LIMIT " +
          req.body.limit;
        db.query(sql, (err, data) => {
          if (err) {
            return res.status(400).json({ err: "Ambil data gagal" });
          }
          const fotoId = [];
          for (const dat of data) {
            fotoId.push(dat.id);
          }
          const fotoIds = fotoId.join(", ");
          if (fotoIds) {
            const sql2 =
              "SELECT * FROM like_foto WHERE foto_id IN (" +
              fotoIds +
              ") AND user_id = " +
              id;
            db.query(sql2, (err, data2) => {
              if (err) {
                return res.status(400).json({ err: err.sqlMessage });
              }
              const sql3 =
                "SELECT foto.id, COUNT(komentar_foto.id) AS comments FROM foto LEFT JOIN komentar_foto ON komentar_foto.foto_id = foto.id WHERE foto.id IN (" +
                fotoIds +
                ") GROUP BY foto.id;";
              db.query(sql3, (err, data3) => {
                if (err) {
                  return res.status(400).json({ err: "Ambil data gagal" });
                }
                const sql5 = `SELECT COUNT(*) AS fotoCount FROM foto WHERE user_id = ${profileId}`;
                db.query(sql5, (err, data5) => {
                  if (err) {
                    return res.status(400).json({ err: "Ambil data gagal" });
                  }
                  return res
                    .status(200)
                    .json({ data, data2, data3, data4, data5: data5[0] });
                });
              });
            });
          } else {
            return res.status(200).json({ data, data4 });
          }
        });
      });
    });
  } else {
    const sql4 =
      "SELECT * FROM user WHERE username = '" + req.body.profileUsername + "'";
    db.query(sql4, (err, data4) => {
      if (err) {
        return res.status(400).json({ err: "Ambil data gagal" });
      }
      if (data4.length == 0) {
        return res.status(404).json({ err: "Profil tidak ditemukan" });
      }
      const profileId = data4[0].id;
      const sql =
        "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id WHERE user.id = '" +
        profileId +
        "' GROUP BY foto.id ORDER BY `foto`.`tanggal_unggah` DESC LIMIT " +
        req.body.limit;
      db.query(sql, (err, data) => {
        if (err) {
          return res.status(400).json({ err: "Ambil data gagal" });
        }
        const fotoId = [];
        for (const dat of data) {
          fotoId.push(dat.id);
        }
        const fotoIds = fotoId.join(", ");
        if (fotoIds) {
          const sql3 =
            "SELECT foto.id, COUNT(komentar_foto.id) AS comments FROM foto LEFT JOIN komentar_foto ON komentar_foto.foto_id = foto.id WHERE foto.id IN (" +
            fotoIds +
            ") GROUP BY foto.id;";
          db.query(sql3, (err, data3) => {
            if (err) {
              return res.status(400).json({ err: "Ambil data gagal" });
            }
            return res.status(200).json({ data, data3, data4 });
          });
        } else {
          return res.status(200).json({ data, data4 });
        }
      });
    });
  }
};

const search = (req, res) => {
  if (req.body.mode == "foto") {
    if (req.body.username) {
      const sql1 =
        "SELECT * FROM user WHERE username = '" + req.body.username + "'";
      db.query(sql1, (err, data) => {
        if (err) {
          return res.status(400).json({ err: "Anda Belum Login" });
        }
        const id = data[0].id;
        const sql =
          "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id WHERE foto.judul_foto LIKE '%" +
          req.body.query +
          "%' GROUP BY foto.id ORDER BY `foto`.`tanggal_unggah` DESC LIMIT " +
          req.body.limit;
        db.query(sql, (err, data) => {
          if (err) {
            return res.status(400).json({ err: "Ambil data gagal" });
          }
          const fotoId = [];
          for (const dat of data) {
            fotoId.push(dat.id);
          }
          const fotoIds = fotoId.join(", ");
          if (fotoIds) {
            const sql2 =
              "SELECT * FROM like_foto WHERE foto_id IN (" +
              fotoIds +
              ") AND user_id = " +
              id;
            db.query(sql2, (err, data2) => {
              if (err) {
                return res.status(400).json({ err: "Ambil data gagal" });
              }
              const sql3 =
                "SELECT foto.id, COUNT(komentar_foto.id) AS comments FROM foto LEFT JOIN komentar_foto ON komentar_foto.foto_id = foto.id WHERE foto.id IN (" +
                fotoIds +
                ") GROUP BY foto.id;";
              db.query(sql3, (err, data3) => {
                if (err) {
                  return res.status(400).json({ err: "Ambil data gagal" });
                }
                const sql4 = "SELECT COUNT(*) AS fotoCount FROM foto WHERE foto.judul_foto LIKE '%" + req.body.query + "%'";
                db.query(sql4, (err, data4) => {
                  if (err) {
                    return res.status(400).json({ err: "Ambil data gagal" });
                  }
                  return res
                    .status(200)
                    .json({ data, data2, data3, data4: data4[0] });
                });
              });
            });
          } else {
            return res.status(200).json({ data });
          }
        });
      });
    } else {
      const sql =
        "SELECT foto.*, user.username, COUNT(like_foto.id) AS likes FROM `foto` INNER JOIN user ON foto.user_id = user.id LEFT JOIN like_foto ON foto.id = like_foto.foto_id WHERE foto.judul_foto LIKE '%" +
        req.body.query +
        "%' GROUP BY foto.id ORDER BY `foto`.`tanggal_unggah` ASC LIMIT " +
        req.body.limit;
      db.query(sql, (err, data) => {
        if (err) {
          return res.status(400).json({ err: "Ambil data gagal" });
        }
        const fotoId = [];
        for (const dat of data) {
          fotoId.push(dat.id);
        }
        const fotoIds = fotoId.join(", ");
        if (fotoIds) {
          const sql3 =
            "SELECT foto.id, COUNT(komentar_foto.id) AS comments FROM foto LEFT JOIN komentar_foto ON komentar_foto.foto_id = foto.id WHERE foto.id IN (" +
            fotoIds +
            ") GROUP BY foto.id;";
          db.query(sql3, (err, data3) => {
            if (err) {
              return res.status(400).json({ err: "Ambil data gagal" });
            }
            const sql4 = "SELECT COUNT(*) AS fotoCount FROM foto WHERE foto.judul_foto LIKE '%" + req.body.query + "%'";
            db.query(sql4, (err, data4) => {
              if (err) {
                return res.status(400).json({ err: "Ambil data gagal" });
              }
              return res.status(200).json({ data, data3, data4: data4[0] });
            });
          });
        } else {
          return res.status(200).json({ data });
        }
      });
    }
  } else if (req.body.mode == "user") {
    const sql = `SELECT * FROM user WHERE username LIKE '%${req.body.query}%' LIMIT ${req.body.limit}`
    db.query(sql, (err, data) => {
      if (err) return res.status(400).json({ err: "Ambil data gagal"});
      const sql2 = `SELECT COUNT(*) AS userCount FROM user WHERE username LIKE '%${req.body.query}%'`
      db.query(sql2, (err, data2) => {
        if (err) return res.status(400).json({ err: "Ambil data gagal"});
        return res.status(200).json({data, data2: data2[0]})
      })
    })
  }
};

module.exports = {
  home,
  foto,
  profile,
  search
};
