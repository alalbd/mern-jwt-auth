// External imports
const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// User Mongo Collection
const User = mongoose.model("User", userSchema);

// export
module.exports = User;
