const Admin = require("../models/admin.model");
const Course = require("../models/course.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    console.log(email, password, firstName, lastName);
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      res.status(400).json({
        message: "Email already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAdmin = await Admin.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      admin: createdAdmin,
      message: "Admin is SignedIn",
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
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({
        message: "Email is not present in Database",
      });
    }
    const isMatched = await bcrypt.compare(password, admin.password);
    // console.log("isMatched", isMatched);
    if (!isMatched) {
      res.json({
        message: "Incorrect email/password",
      });
    }
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_ADMIN_SECRET
    );
    //cookie logic here

    res.json({
      message: "Admin is signedIn",
      token: token,
    });
  } catch (err) {
    console.log("Error in signin Controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.addCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, creatorId } = req.body;
    const courseCreated = await Course({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });
    res.json({
      message: "addCourse endpoint",
      courseId: courseCreated._id,
    });
  } catch (err) {
    console.log("Error in addCourse controller :", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.updateCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, imageUrl, price, courseId } = req.body;
    const updateCourse = await Course.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      }
    );
    res.json({
      message: "course Updated",
      courseId: updateCourse._id,
    });
  } catch (err) {
    console.log("Error in addCourse controller :", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.getCourse = async (req, res) => {
  res.json({
    message: "courseBulk endpoint",
  });
};
