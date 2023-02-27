const express=require("express")
const {connection}=require("./configs/db")
const {authenticate}=require("./middleware/authenticate.js")
const cors = require("cors")


const {userRouter}=require("./routes/user.routes")
const {covid_Router} = require("./routes/covid.model")
const {HealthcareDevices_Router} = require("./routes/Healthcare_Devices_data")
const {Healthcaredata_Router} = require("./routes/Healthcaredata")
const {HealthFooddrink_Router} = require("./routes/HealthFooddrink")
const {Skincare_Router} = require("./routes/Skincare")


const app=express();
require("dotenv").config();
app.use(express.json());
app.use(cors())

app.use("/user",userRouter)

app.use("/covid",covid_Router)
app.use("/HealthcareDevices",HealthcareDevices_Router)
app.use("/Healthcaredata",Healthcaredata_Router)
app.use("/HealthFooddrink",HealthFooddrink_Router)
app.use("/Skincare",Skincare_Router)



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`sever is running at ${process.env.port}`)
})