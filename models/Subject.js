const mongoose = require("mongoose")

const schema = new mongoose.Schema({
 name:String,
 priority:{
   type:String,
   default:"medium"
 },
 userId:String
})

module.exports = mongoose.model("Subject",schema)