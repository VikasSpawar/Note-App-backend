const jwt=require("jsonwebtoken")
require("dotenv").config();


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    if(token){
        const decoded=jwt.verify(token,"masai")
        // console.log(decoded.userID)
        // res.end()
        if(decoded){
            const userid=decoded.userID
            req.body.userID=userid
            next()
        }else{
            res.send("Please Login first")
        }
    }
    else{
        res.send("Please login first")
    }
}

module.exports={
    authenticate
}
