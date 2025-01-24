const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

module.exports.signup = async (req, res) => {
  // const requiredBody = z.object({
  //   email: z.string().min(3).max(100).email(),
  //   password: z.string().min(3).max(30),
  //   firstName: z.string().min(3).max(100),
  //   lastName: z.string().min(3).max(100),
  // });
  // // const parsedData = requiredBody.parse(req.body);
  // const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  // if (!parsedDataWithSuccess.success) {
  //   res.json({
  //     message: "Incorrect format",
  //     error: parsedDataWithSuccess.error,
  //   });
  // }
  try {
    const { email, password, firstName, lastName } = req.body;

    console.log(email, password, firstName, lastName);
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({
        message: "Email already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
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
};

module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not present in Database",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    // console.log("isMatched", isMatched);
    if (!isMatched) {
      res.json({
        message: "Incorrect email/password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    //cookie logic here

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
      message: "userPurchases controller",
    });
  } catch (err) {
    console.log("Error in userPurchases Controller");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
