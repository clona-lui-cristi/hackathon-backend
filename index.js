const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "H5vkxkG8qn",
  password: "rkJ3cr2xNs",
  database: "H5vkxkG8qn",
  port: 3306,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  db.query("SELECT * FROM PSB", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/create", (req, res) => {
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;

  db.query(
    "INSERT INTO PSB (longitude, latitude) VALUES (?, ?)",
    [longitude, latitude],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else {
        db.query("SELECT * FROM PSB", (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error");
          } else {
            res.status(200).send(results);
          }
        });
      }
    }
  );
});

app.delete("/delete", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM PSB WHERE id = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Delete successful");
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM PSB WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
