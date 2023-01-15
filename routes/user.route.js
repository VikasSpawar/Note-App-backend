const express=require("express")
const {UserModel}=require("../models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()




userRouter.post ("/login",async(req,res)=>{

    const {email,pass}=req.body
    try {
        const user=await UserModel.find({email})

        const hashed_pass=user[0].pass
        // console.log(user)
        // console.log(hashed_pass)
        if(user.length>0){
            bcrypt.compare(pass, hashed_pass, function(err, result) {
                // result == true
                // console.log(result)
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"masai")

                    res.send({"msg":"Login Successfull","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            });
            
            
        }
        else{
            res.send("Wrong Credentials")

        }
      

    } catch (error) {
        res.send("Something went wrong")
        console.log("erro to find user")
    }

    // res.send("Logged In")
})


module.exports={
    userRouter
}