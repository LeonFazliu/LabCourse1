const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "labcourse",
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM staff_db";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, role, password } = req.body;
  const sqlInsert =
    "INSERT INTO staff_db (name, email, role, password) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [name, email, role, password], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;
  const sqlUpdate =
    "UPDATE staff_db SET name = ?, email = ?, role = ?, password = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [name, email, role, password, id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.get("/api/hotels", (req, res) => {
  const sqlGetHotels = "SELECT * FROM hotels_db";
  db.query(sqlGetHotels, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/hotels", (req, res) => {
  const { hotelname, hotelcity } = req.body;
  const sqlInsertHotel =
    "INSERT INTO hotels_db (hotelname, hotelcity) VALUES (?, ?)";
  db.query(sqlInsertHotel, [hotelname, hotelcity], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.put("/api/hotels/:hotel_id", (req, res) => {
  const { hotel_id } = req.params;
  const { hotelname, hotelcity } = req.body;
  const sqlUpdateHotel =
    "UPDATE hotels_db SET hotelname = ?, hotelcity = ? WHERE hotel_id = ?";
  db.query(
    sqlUpdateHotel,
    [hotelname, hotelcity, hotel_id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.get("/api/customers", (req, res) => {
  const sqlGetCustomers = "SELECT * FROM costumers_db";
  db.query(sqlGetCustomers, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/customers", (req, res) => {
  const { CostumerName, CostumersPhone, CostumersEmail, CostumersGender } =
    req.body;
  const sqlInsertCustomer =
    "INSERT INTO costumers_db (CostumerName, CostumersPhone, CostumersEmail, CostumersGender) VALUES (?,?,?,?)";
  db.query(
    sqlInsertCustomer,
    [CostumerName, CostumersPhone, CostumersEmail, CostumersGender],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/api/customers/:Costumer_id", (req, res) => {
  const { Costumer_id } = req.params;
  const sqlDeleteCustomer = "DELETE FROM costumers_db WHERE Costumer_id = ?";
  db.query(sqlDeleteCustomer, Costumer_id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
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
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.put("/api/customers/:Costumer_id", (req, res) => {
  const { Costumer_id } = req.params;
  const { CostumerName, CostumersPhone, CostumersEmail, CostumersGender } =
    req.body;
  const sqlUpdateCustomer =
    "UPDATE costumers_db SET CostumerName = ?, CostumersPhone = ?, CostumersEmail = ?, CostumersGender = ? WHERE Costumer_id = ?";
  db.query(
    sqlUpdateCustomer,
    [
      CostumerName,
      CostumersPhone,
      CostumersEmail,
      CostumersGender,
      Costumer_id,
    ],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.get("/api/finances", (req, res) => {
  const sqlGetFinances = "SELECT * FROM finances_db";
  db.query(sqlGetFinances, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/finances", (req, res) => {
  const { name, salary, paymentdate } = req.body;
  const sqlInsertFinance =
    "INSERT INTO finances_db (name, salary, paymentdate) VALUES (?, ?, ?)";
  db.query(sqlInsertFinance, [name, salary, paymentdate], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.sendStatus(200);
  });
});

app.delete("/api/finances/:salaryid", (req, res) => {
  const { salaryid } = req.params;
  const sqlRemoveFinance = "DELETE FROM finances_db WHERE salaryid = ?";
  db.query(sqlRemoveFinance, salaryid, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.sendStatus(200);
  });
});

app.get("/api/finances/:salaryid", (req, res) => {
  const { salaryid } = req.params;
  const sqlGetFinanceById = "SELECT * FROM finances_db WHERE salaryid = ?";
  db.query(sqlGetFinanceById, salaryid, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.put("/api/finances/:salaryid", (req, res) => {
  const { salaryid } = req.params;
  const { name, salary, paymentdate } = req.body;
  const sqlUpdateFinance =
    "UPDATE finances_db SET name = ?, salary = ?, paymentdate = ? WHERE salaryid = ?";
  db.query(
    sqlUpdateFinance,
    [name, salary, paymentdate, salaryid],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.get("/api/reservations", (req, res) => {
  const sqlGetReservations = "SELECT * FROM reservation_db";
  db.query(sqlGetReservations, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.post("/api/reservations", (req, res) => {
  const { CostumerName, hotelname, checkindate, checkoutdate } = req.body;
  const sqlInsertReservation =
    "INSERT INTO reservation_db (CostumerName, hotelname, checkindate, checkoutdate) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsertReservation,
    [CostumerName, hotelname, checkindate, checkoutdate],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/api/reservations/:Reservation_id", (req, res) => {
  const { Reservation_id } = req.params;
  const sqlRemoveReservation =
    "DELETE FROM reservation_db WHERE Reservation_id = ?";
  db.query(sqlRemoveReservation, Reservation_id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.sendStatus(200);
  });
});

app.get("/api/reservations/:Reservation_id", (req, res) => {
  const { Reservation_id } = req.params;
  const sqlGetReservationById =
    "SELECT * FROM reservation_db WHERE Reservation_id = ?";
  db.query(sqlGetReservationById, Reservation_id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

app.put("/api/reservations/:Reservation_id", (req, res) => {
  const { Reservation_id } = req.params;
  const { CostumerName, hotelname, checkindate, checkoutdate } = req.body;
  const sqlUpdateReservation =
    "UPDATE reservation_db SET CostumerName = ?, hotelname = ?, checkindate = ?, checkoutdate = ? WHERE Reservation_id = ?";
  db.query(
    sqlUpdateReservation,
    [CostumerName, hotelname, checkindate, checkoutdate, Reservation_id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.sendStatus(200);
    }
  );
});

const jwtSecret = "your_jwt_secret";

// Middleware to check token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token is required");

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(500).send("Invalid token");
    req.user = decoded;
    next();
  });
};

// Middleware to check roles
const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send("Access denied");
  }
  next();
};

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email and password are required");

  const query = "SELECT * FROM staff_db WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length === 0) return res.status(400).send("Email not found");

    const user = results[0];
    if (password !== user.password)
      return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ Status: "Success", Token: token });
  });
});

app.post("/logout", verifyToken, (req, res) => {
  res.json({ Status: "Success", Message: "Logged out successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
