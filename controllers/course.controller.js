const Course = require("../models/course.model");

module.exports.preview = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      courses,
      message: "get All Courses",
    });
  } catch (err) {
    console.log("Error in getAllCourses Controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.purchase = async (req, res) => {
  const courses=await Course.find();
  try {
    res.json({
      courses:courses
      message: "User is in course purchase controller",
    });
  } catch (err) {
    console.log("Error in getAllCourses Controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
