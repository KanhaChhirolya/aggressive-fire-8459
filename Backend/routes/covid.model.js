const express=require("express");
const app=express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const covid_Router=express.Router();
const {Covid}=require("../models/covid-model")

app.use(express.json());

covid_Router.get("/",async(req,res)=>{
    // const token=req.headers.authorization
    const id=req.params.id;
    if(id){
        const CovidData = await Covid.find({_id:id})
                res.send(CovidData)
    }else{
        const CovidData= await Covid.find()
                res.send(CovidData)
    }
    // if(token){
    //     jwt.verify(token,"hell",async(err,decoded)=>{
    //         if(decoded){
                // const CovidData= await Covid.find({_id:id})
                // res.send(CovidData)
    //         }else{
    //             res.send({msg:"wrong token"})
    //         }
    //     })
    // }else{
    //     res.send("Please login first")
    // }
})
covid_Router.post("/create",async(req,res)=>{
    try {
        const payloade=req.body;
        if(Array.isArray(payloade)){
            for(let el of payloade){
                const newnote= await Covid(el);
                newnote.save();
            }
        }else{
            const newnote= await Covid(payloade);
            newnote.save();
        }
        
        res.send({msg:"new data is availble"})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
covid_Router.patch("/update/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const payloade=req.body;
        await Covid.findByIdAndUpdate(id,payloade)
        res.send({"msg":`note with id:${id} has been updated`})
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    
    }
})
covid_Router.delete('/delete/:id',async(req,res)=>{
    const Id=req.params.id;
    await Covid.findByIdAndDelete({_id:noteId})
    res.send({"msg":`note with id:${Id} has been deleted`})
})


module.exports={
    covid_Router
}