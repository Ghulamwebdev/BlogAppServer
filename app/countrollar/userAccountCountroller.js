
const UserAuth = require("../modules/userAuthModal");
const bcrypt = require("bcrypt");
const getUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; 
    const userData = await UserAuth.findById(userId);
    if (!userData) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }
    res.status(200).json({
      status: 200,
      message: "User account information",
      userData
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message
    });
  }
};

// Update user account info
const updateUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; 

    if (!userId) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }
    const user = await UserAuth.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }
    if (req.body.password) {
      const isSamePassword = await bcrypt.compare(req.body.password, user.password);
      if (!isSamePassword) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } else {
        req.body.password = user.password;
      }
    }
    const updatedUser = await UserAuth.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      message: "User account updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; 

    if (!userId) {
      return res.status(400).json({ status: 400, message: "User ID is required" });
    }

    const deleteUser = await UserAuth.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }

    return res.status(200).json({
      status: 200,
      message: "User account deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { getUserAccount,updateUserAccount,deleteUserAccount };
