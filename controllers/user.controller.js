const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  //   const { name, email, password } = req.body;

  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);
    const user = await User.findOne({ email: email });
    if (user) {
      res.staus(400).json({
        message: "Email already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.json({
      user: createdUser,
      message: "User is SignedIn",
    });
  } catch (err) {
    console.log("Error in signup Controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
  res.json({
    message: "User is Signedup",
  });
};

module.exports.signin = (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not present in Database",
      });
    }
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.json({
        message: "Incorrect email/password",
      });
    }
    const token = jwt.sign(
      {
        name: user.name,
      },
      process.env.JWT_SECRET
    );
    res.json({
      message: "User is signedIn",
      token: token,
    });
  } catch (err) {
    console.log("Error in signin Controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    message: "Get All Users",
    users: users,
  });
};

module.exports.userPurchases = async (req, res) => {
  try {
    res.status(200).json({
        message:"userPurchases controller"
    });
  } catch (err) {
    console.log("Error in userPurchases Controller");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
