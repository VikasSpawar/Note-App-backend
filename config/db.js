const mongoose=require("mongoose")

const URL=`mongodb+srv://vikas:mongo@cluster0.kqkto62.mongodb.net/authdata?retryWrites=true&w=majority`

const connection=mongoose.connect(URL)

module.exports={
    connection
}

