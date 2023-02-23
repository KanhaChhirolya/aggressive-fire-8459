const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Skincare_Router = express.Router();
const {Skincare}=require("../models/skinCare-model")

app.use(express.json());

Skincare_Router.get("/",async(req,res)=>{
    // const token=req.headers.authorization
    const id=req.params.id;
    if(id){
        const SkincareData = await Skincare.find({_id:id})
                res.send(SkincareData)
    }else{
        const SkincareData= await Skincare.find()
                res.send(SkincareData)
    }
    // if(token){
    //     jwt.verify(token,"hell",async(err,decoded)=>{
    //         if(decoded){
                // const SkincareData = await Skincare.find({_id:id})
                // res.send(SkincareData)
    //         }else{
    //             res.send({msg:"wrong token"})
    //         }
    //     })
    // }else{
    //     res.send("Please login first")
    // }
})
Skincare_Router.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        if(Array.isArray(payloade)){
            for(let el of payloade){
                const newnote= await Skincare(el);
                newnote.save();
            }
        }else{
            const newdata= await Skincare(payloade);
            newdata.save();
        }
        
        res.send({msg:"new data is availble"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
Skincare_Router.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await Skincare.findByIdAndUpdate(id,payloade)
        res.send({"msg":`note with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
Skincare_Router.delete('/delete/:id',async(req,res)=>{
    const Id=req.params.id;
    await Skincare.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id:${Id} has been deleted`})
})


module.exports={
    Skincare_Router
}