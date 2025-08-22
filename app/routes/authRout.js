const express = require('express');
const { createUser, userLogin } = require('../countrollar/userAuthCountrollar');


const authRout = express.Router();
const multer = require("multer");


// Set up multer for file uploads (if needed in the future)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Sample route for user management
authRout.post('/user-signup', upload.single("profile"), createUser);
authRout.post('/user-login',userLogin);
module.exports = authRout;