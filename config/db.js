const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

//makes connection to MongoDB atlas
const connectDB = async () => {
  try {
    let gfs;
    let conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Init stream
    gfs = Grid(conn, mongoose.mongo);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
