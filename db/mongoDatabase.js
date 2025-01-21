const mongoose = require("mongoose");

async function ConntectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to Database");
    });
  } catch (err) {
    console.log("Error while connecting to Database");
  }
}

module.exports = ConntectToDB;
