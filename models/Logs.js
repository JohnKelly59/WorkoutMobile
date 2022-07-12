const mongoose = require("mongoose");
// schema for user favorite cards
const LogsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },

  desc: {
    type: String,
  },

  date: {
    type: String,
  },

  email: {
    type: String,
  },
  time: {
    type: Date,
  },
});

module.exports = mongoose.model("Logs", LogsSchema);
