require("dotenv").config(); 
const express = require("express");
const connectDB = require("./dbConnection/db");
const authRout = require("./app/routes/authRout");
const { accountRoute } = require("./app/routes/userAcountRoutes");
const cors = require("cors")
const app = express();

// Connect Database
connectDB();
// Middleware
app.use(express.json());
app.use(cors());




// AUthentication Routes
app.use("/auth", authRout)
//==user account menagment===//
app.use("/user", accountRoute)

// Use PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
