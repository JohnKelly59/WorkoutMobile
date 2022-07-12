const mongoose = require("mongoose");
// schema for user favorite cards
const FavoriteSchema = new mongoose.Schema({
  id: {
    type: String,
  },

  UserEmail: {
    type: String,
  },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
