const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HealthcareDevices_Router = express.Router();
const {HealthcareDevices}=require("../models/HealthCareDevice-model")

app.use(express.json());

HealthcareDevices_Router.get("/",async(req,res)=>{
    // const token=req.headers.authorization
    const id=req.params.id;
    if(id){
        const HealthcareDevicesData= await HealthcareDevices.find({_id:id})
                res.send(HealthcareDevicesData)
    }else{
        const HealthcareDevicesData= await HealthcareDevices.find()
                res.send(HealthcareDevicesData)
    }
    // if(token){
    //     jwt.verify(token,"hell",async(err,decoded)=>{
    //         if(decoded){
                // const HealthcareDevicesData= await HealthcareDevices.find({_id:id})
                // res.send(HealthcareDevicesData)
    //         }else{
    //             res.send({msg:"wrong token"})
    //         }
    //     })
    // }else{
    //     res.send("Please login first")
    // }
})
HealthcareDevices_Router.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        if(Array.isArray(payloade)){
            for(let el of payloade){
                const newnote= await HealthcareDevices(el);
                newnote.save();
            }
        }else{
            const newnote= await HealthcareDevices(payloade);
            newnote.save();
        }
        
        res.send({msg:"new data is availble"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
HealthcareDevices_Router.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await HealthcareDevices.findByIdAndUpdate(id,payloade)
        res.send({"msg":`note with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
HealthcareDevices_Router.delete('/delete/:id',async(req,res)=>{
    const Id=req.params.id;
    await HealthcareDevices.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id:${Id} has been deleted`})
})


module.exports={
    HealthcareDevices_Router
}