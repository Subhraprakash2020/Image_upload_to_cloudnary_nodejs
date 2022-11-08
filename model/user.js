const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  // name: String,
  // profile_img: String,
  // cloudinary_id: String
  name:{
    type : String
},
image:{
    required:true,
    type:String
},
tagline:{
    type : String
},
description:{
    type : String
},
moderator:{
    type : String
},
catagory:{
    type : String
},
sub_catagory:{
    type : String
},
rigor_rank:{
    type : Number
}
});
module.exports = mongoose.model("user", userSchema);