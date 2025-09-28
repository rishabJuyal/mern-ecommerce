const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    token:{type:String,required :true},
    userId:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    ip:{type: String,required:true},
    userAgent:{type: String},
    expiresAt:{type: Date,required:true}
})
module.exports = mongoose.model("RefreshToken",refreshTokenSchema)