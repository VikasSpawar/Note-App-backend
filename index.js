//Authentications
const express=require("express")
var cors = require('cors')
const app=express()
const connection=require("./config/db")
const {UserModel}=require("./models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { authenticate } = require("./middlewares/authenticate.middleware")
const { noteRouter } = require("./routes/Note.route")
const { userRouter } = require("./routes/user.route")
app.use(express.json())
app.use(cors())
app.get("/",async(req,res)=>{
    const data= await UserModel.find()
    res.send(data)
})



// app.get("/data",(req,res)=>{
//     const token=req.headers.authorization
//     // const token=req.query.token
//     console.log(token)
//     jwt.verify(token,"masai",(err,decoded)=>{
//         if(err){
//             res.send("Invalid token")
//             console.log(err)
//         }
//         else{
//             res.send("Data...")
//         }
//     })

//     // if(token==="abc123"){
//     //     res.send("Data Page")
//     // }
//     // else{res.send("Login first")}

//     // res.send("data page")
// })
// app.get("/about",(req,res)=>{
//     res.send("about page")
// })
// app.get("/cart",(req,res)=>{
    
//     const token=req.query.token
//     jwt.verify(token,"masai",(err,decoded)=>{
//         if(err){
//             res.send("Invalid token")
//             console.log(err)
//         }
//         else{
//             res.send("Cart Page")
//         }
//     })
// })
// app.get("/contact",(req,res)=>{
//     res.send("contact page")
// })



app.post("/register",async(req,res)=>{

    const {email,pass,age,name}=req.body


    try{
        bcrypt.hash(pass, 5, async(err, secure_pass)=> {
            // Store hash in your password DB.
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({email,pass:secure_pass,name,age})
                await user.save()
                res.send("Registered")
            }
        });

        // const user=new UserModel(payload)
        // await user.save()

        // res.send("User is registered!")
    }catch(err){
        res.send("Error in registering the user")
        console.log(err)
    }


    // res.send("Registered")
})


// app.post ("/login",async(req,res)=>{

//     const {email,pass}=req.body
//     try {
//         const user=await UserModel.find({email})

        
//         console.log(user)
//         if(user.length>0){
//             bcrypt.compare(pass, user[0].pass, function(err, result) {
//                 // result == true
//                 if(result){
//                     const token=jwt.sign({course:"backend"},"masai")

//                     res.send({"msg":"Login Successfull","token":token})
//                 }else{
//                     res.send("Wrong Credentials")
//                 }
//             });
            
            
//         }
//         else{
//             res.send("Wrong Credentials")

//         }
      

//     } catch (error) {
//         res.send("Something went wrong")
//         console.log("erro to find user")
//     }

//     // res.send("Logged In")
// })
app.use("/",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(8080,async()=>{

    try{
           await connection
            console.log("connected to DB")
    }catch(err){
        console.log("Trouble connecting to DB")
    }
    console.log("running on port 8080")
})