module.exports.getAllCourses = async (req, res) => {
  try {
    res.json({
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
  try {
    res.json({
      message: "User is in course purchase controller",
    });
  } catch (err) {
    console.log("Error in getAllCourses Controller", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
