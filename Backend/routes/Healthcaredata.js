const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Healthcaredata_Router = express.Router();
const {Healthcaredata}=require("../models/healthcare-data-model")

app.use(express.json());

Healthcaredata_Router.get("/",async(req,res)=>{
    // const token=req.headers.authorization
    const id=req.params.id;
    if(id){
        const HealthcareData = await Healthcaredata.find({_id:id})
                res.send(HealthcareData)
    }else{
        const HealthcareData= await Healthcaredata.find()
                res.send(HealthcareData)
    }
    // if(token){
    //     jwt.verify(token,"hell",async(err,decoded)=>{
    //         if(decoded){
                // const HealthcareData = await Healthcaredata.find({_id:id})
                // res.send(HealthcareData)
    //         }else{
    //             res.send({msg:"wrong token"})
    //         }
    //     })
    // }else{
    //     res.send("Please login first")
    // }
})
Healthcaredata_Router.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        if(Array.isArray(payloade)){
            for(let el of payloade){
                const newnote= await Healthcaredata(el);
                newnote.save();
            }
        }else{
            const newnote= await Healthcaredata(payloade);
            newnote.save();
        }
        
        res.send({msg:"new data is availble"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
Healthcaredata_Router.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await Healthcaredata.findByIdAndUpdate(id,payloade)
        res.send({"msg":`note with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
Healthcaredata_Router.delete('/delete/:id',async(req,res)=>{
    const Id=req.params.id;
    await Healthcaredata.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id:${Id} has been deleted`})
})


module.exports={
    Healthcaredata_Router
}