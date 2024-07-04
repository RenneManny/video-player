// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';
dotenv.config({
    path:"./env"
})




connectDB().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`App is listening at port ${process.env.PORT}`)
    })
}).catch((err)=>{
 app.on("error",(err)=>{
    console.log(`Mongodb connection failed`,err);
 })
  
})
/*import mongoose, { mongo } from "mongoose";
import {DB_NAME} from "./constants"

import express from "express"
const app=express()

(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("error while connecting to database");
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log("App is listining perfectly!")
       })
    }
    catch(err){
        console.error("error:",err);
        throw err
    }
})()
*/