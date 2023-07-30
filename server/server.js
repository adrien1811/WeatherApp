const PORT= process.env.PORT ?? 8000
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const router = express.Router();
const bcrypt = require("bcrypt");

app.listen (PORT, ()=> console.log(`Server running on PORT ${PORT}`))