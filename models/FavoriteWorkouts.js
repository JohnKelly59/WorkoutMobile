const mongoose = require("mongoose");
// schema for user favorite cards
const FavoriteWorkoutsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  exercises: {
    type: Array,
  },
  UserEmail: {
    type: String,
  },
  time: {
    type: Date,
  },
  title: {
    type: String,
  },
  partnerEmails: {
    type: Array,
  },
});

module.exports = mongoose.model("FavoriteWorkouts", FavoriteWorkoutsSchema);
