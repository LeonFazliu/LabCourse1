const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "labcourse1"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM staff_db";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

app.post("/api/post", (req, res) => {
    const { name, email, position } = req.body;
    const sqlInsert = "INSERT INTO staff_db (name, email, position) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, position], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM staff_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGetById = "SELECT * FROM staff_db WHERE id = ?";
    db.query(sqlGetById, id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, position } = req.body;
    const sqlUpdate = "UPDATE staff_db SET name = ?, email = ?, position = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, position, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
