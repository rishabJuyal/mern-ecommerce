const mongoose = require("mongoose");
// Define address sub-schema
const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { _id: true }); // prevents automatic _id for each address


  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true , unique: true},
    email: { type: String, required: true },
    password: {type: String, required: true},
    role: {type: String , enum:['customer','admin'], default:'customer',required : true},
    address: {
      type: [addressSchema],
      default: []
    }
  }, {
    timestamps: true // adds createdAt and updatedAt automatically
  });
  
  module.exports = mongoose.model("User", userSchema);