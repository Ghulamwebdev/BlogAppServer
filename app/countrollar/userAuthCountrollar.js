

const UserAuth = require("../modules/userAuthModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async(req, res) => {
 
  try {
     const {name, email, password} = req.body;
      // Check if user already exists
      const existingUser = await UserAuth.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          status: "error",
          message: "User already exists with this email!"
        });
      } 
      
       // hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

      const image = req.file ? req.file.buffer.toString('base64') : null

     const createUser = new UserAuth(
      {
       name,
       email,
       password: hashedPassword,
       profile:image,
      }
      );
      await createUser.save();
      res.send({
        status: "success",
        message: "User created successfully!",
        user: createUser
      })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Failed to create user",
      error: error.message
    });

  }
  
}

//===user login=====//

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email
    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};






module.exports = {createUser,userLogin}