const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HealthFooddrink_Router = express.Router();
const {HealthFooddrink}=require("../models/HealthFoodDrink-model")

app.use(express.json());

HealthFooddrink_Router.get("/",async(req,res)=>{
    // const token=req.headers.authorization
    const id=req.params.id;
    if(id){
        const HealthFooddrinkData = await HealthFooddrink.find({_id:id})
                res.send(HealthFooddrinkData)
    }else{
        const HealthFooddrinkData= await HealthFooddrink.find()
                res.send(HealthFooddrinkData)
    }
    // if(token){
    //     jwt.verify(token,"hell",async(err,decoded)=>{
    //         if(decoded){
                // const HealthFooddrinkData = await HealthFooddrink.find({_id:id})
                // res.send(HealthFooddrinkData)
    //         }else{
    //             res.send({msg:"wrong token"})
    //         }
    //     })
    // }else{
    //     res.send("Please login first")
    // }
})
HealthFooddrink_Router.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        if(Array.isArray(payloade)){
            for(let el of payloade){
                const newnote= await HealthFooddrink(el);
                newnote.save();
            }
        }else{
            const newnote= await HealthFooddrink(payloade);
            newnote.save();
        }
        
        res.send({msg:"new data is availble"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
HealthFooddrink_Router.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await HealthFooddrink.findByIdAndUpdate(id,payloade)
        res.send({"msg":`note with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
HealthFooddrink_Router.delete('/delete/:id',async(req,res)=>{
    const Id=req.params.id;
    await HealthFooddrink.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id:${Id} has been deleted`})
})


module.exports={
    HealthFooddrink_Router
}