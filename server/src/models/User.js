const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true },
    password: {type: String, required: true},
    role: {type: String , enum:['customer','admin'], default:'customer',required : true},
  }, {
    timestamps: true // adds createdAt and updatedAt automatically
  });
  
  module.exports = mongoose.model("User", userSchema);