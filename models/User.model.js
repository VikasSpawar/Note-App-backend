const { default: mongoose } = require("mongoose");

const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})


const UserModel=mongoose.model("user",UserSchema)


module.exports={
    UserModel
}


