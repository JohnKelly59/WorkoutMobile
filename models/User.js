const mongoose = require("mongoose");
var options = {
  personModelName: "User",
  friendshipModelName: "Friendship",
  friendshipCollectionName: "Relationships_Collection",
};
var friendsOfFriends = require("friends-of-friends")(mongoose, options);
//user schema
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
UserSchema.plugin(friendsOfFriends.plugin, options);
module.exports = mongoose.model(options.personModelName, UserSchema);
