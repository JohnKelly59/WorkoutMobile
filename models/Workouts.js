const mongoose = require("mongoose");
// schema for user favorite cards
const WorkoutsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  bodyPart: {
    type: String,
  },

  gifUrl: {
    type: String,
  },

  equipment: {
    type: String,
  },

  name: {
    type: String,
  },
  target: {
    type: String,
  },
});

module.exports = mongoose.model("Workouts", WorkoutsSchema);
