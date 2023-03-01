const express = require("express");
const app = express();
const port = 3000;
const response = require("./response");
const db = require("./db_connect");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//=====get=====//
app.get("/", (req, res) => {
  response(200, "ok", "SUCCES", res);
});

app.get("/siswa", (req, res) => {
  const sql = "SELECT * FROM db_siswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "SUCCES siswa get list", res);
  });
});

//=====berdasarkan nim=======//
app.get("/siswa/:nip", (req, res) => {
  const nip = req.params.nip;
  const sql = `SELECT * FROM  db_siswa WHERE nip = ${nip}`;
  db.query(sql, (err, result) => {
    response(200, result, "SUCCES", res);
  });
});

//=======post=========//
app.post("/siswa", (req, res) => {
  const { nip, name, kelas, adress } = req.body;
  const sql = `INSERT INTO db_siswa (nip, name, kelas, adress) VALUES ('${nip}', '${name}', '${kelas}', '${adress}')`;
  db.query(sql, (err, result) => {
    if (err) response(500, "Invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
        id: result.insertId,
      };

      response(200, data, "Add Succes", res);
    }
  });
});

//========put========//
app.put("/siswa", (req, res) => {
  const { nip, name, kelas, adress } = req.body;
  const sql = `UPDATE db_siswa SET name = '${name}', kelas = '${kelas}', adress ='${adress}' WHERE nip = ${nip}`;
  db.query(sql, (err, result) => {
    if (err) response(200, "Invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Update data succesfuly", res);
    } else {
      response(500, "Users not found", "error", res);
    }
  });
});

//======deleted======//
app.delete("/siswa", (req, res) => {
  const { nip } = req.body;
  const sql = `DELETE FROM db_siswa WHERE nip = ${nip}`;
  db.query(sql, (err, result) => {
    if (err) response(500, "Invalid", "Error", res);
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
      };
      response(200, data, "Succesfuly", res);
    } else {
      response(500, "Users not found", "Error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
