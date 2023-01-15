const express=require("express")
const { NoteModel } = require("../models/Note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{

    try {
        const AllNotes=await NoteModel.find()
        res.send(AllNotes)
        
    } catch (error) {
        res.send("Error Get All notes")
    }
    


})
noteRouter.post("/create",async(req,res)=>{

    const noteData=req.body
    const NewNote=new NoteModel(noteData)
    try {
        await NewNote.save()
        res.send("Created New Note Successfully!")
    } catch (error) {
         console.log("Error to create new note")
         res.send("Error to Create New Note")
    }

    // res.send("New Note Created!")
})
noteRouter.patch("/update/:id",async(req,res)=>{
    const updates=req.body

    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await NoteModel.findByIdAndUpdate({"_id":id},updates)
            res.send("Updated the note")
        }
    }catch(er){
        console.log(er)
            res.send({"msg":"Something went wrong"})
    }
    // res.send(`note had been deleted With id : ${id}`)
})
noteRouter.delete("/delete/:id",async(req,res)=>{

    const id=req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }
    }catch(er){
        console.log(er)
            res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    noteRouter
}