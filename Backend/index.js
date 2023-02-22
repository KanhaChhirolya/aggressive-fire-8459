const express=require("express")
const {connection}=require("./configs/db")
const {authenticate}=require("./middleware/authenticate.js")
const {userRouter}=require("./routes/user.routes")
const app=express();
require("dotenv").config();
app.use(express.json());

app.use("/user",userRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`sever is running at ${process.env.port}`)
})