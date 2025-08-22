
const express = require("express");
const {getUserAccount, updateUserAccount, deleteUserAccount } = require("../countrollar/userAccountCountroller");
const authMiddleware = require("../midlewear/authMiddleware")

const accountRoute = express.Router();

accountRoute.get("/account-info", authMiddleware,  getUserAccount);
accountRoute.put("/account-update", authMiddleware,  updateUserAccount);
accountRoute.delete("/account-delete", authMiddleware, deleteUserAccount)


module.exports={accountRoute}