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

app.get("/api/hotels", (req, res) => {
    const sqlGetHotels = "SELECT * FROM hotels_db";
    db.query(sqlGetHotels, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

app.post("/api/hotels", (req, res) => {
    const { hotelname, hotelcity } = req.body;
    const sqlInsertHotel = "INSERT INTO hotels_db (hotelname, hotelcity) VALUES (?, ?)";
    db.query(sqlInsertHotel, [hotelname, hotelcity], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});

app.delete("/api/hotels/:hotel_id", (req, res) => {
    const { hotel_id } = req.params;
    const sqlRemoveHotel = "DELETE FROM hotels_db WHERE hotel_id = ?";
    db.query(sqlRemoveHotel, hotel_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});

app.get("/api/hotels/:hotel_id", (req, res) => {
    const { hotel_id } = req.params;
    const sqlGetHotelById = "SELECT * FROM hotels_db WHERE hotel_id = ?";
    db.query(sqlGetHotelById, hotel_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

app.put("/api/hotels/:hotel_id", (req, res) => {
    const { hotel_id } = req.params;
    const { hotelname, hotelcity } = req.body;
    const sqlUpdateHotel = "UPDATE hotels_db SET hotelname = ?, hotelcity = ? WHERE hotel_id = ?";
    db.query(sqlUpdateHotel, [hotelname, hotelcity, hotel_id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});

app.get("/api/customers", (req, res) => {
    const sqlGetCustomers = "SELECT * FROM costumers_db";
    db.query(sqlGetCustomers, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});


app.post("/api/customers", (req, res) => {
    const { CostumerName, CostumersPhone, CostumersEmail,CostumersGender } = req.body;
    const sqlInsertCustomer = "INSERT INTO costumers_db (CostumerName, CostumersPhone, CostumersEmail, CostumersGender) VALUES (?,?,?,?)";
    db.query(sqlInsertCustomer, [CostumerName, CostumersPhone, CostumersEmail, CostumersGender], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});


app.delete("/api/customers/:Costumer_id", (req, res) => {
    const { Costumer_id } = req.params;
    const sqlDeleteCustomer = "DELETE FROM costumers_db WHERE Costumer_id = ?";
    db.query(sqlDeleteCustomer, Costumer_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.sendStatus(200);
    });
});


app.get("/api/customers/:Costumer_id", (req, res) => {
    const { Costumer_id } = req.params;
    const sqlGetCustomerById = "SELECT * FROM costumers_db WHERE Costumer_id = ?";
    db.query(sqlGetCustomerById, Costumer_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});


app.put("/api/customers/:Costumer_id", (req, res) => {
    const { Costumer_id } = req.params;
    const { CostumerName, CostumersPhone, CostumersEmail, CostumersGender } = req.body;
    const sqlUpdateCustomer = "UPDATE costumers_db SET CostumerName = ?, CostumersPhone = ?, CostumersEmail = ?, CostumersGender = ? WHERE Costumer_id = ?";
    db.query(sqlUpdateCustomer, [CostumerName, CostumersPhone, CostumersEmail, CostumersGender, Costumer_id], (error, result) => {
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
