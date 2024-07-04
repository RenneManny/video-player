import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

// configuration of CORS
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
// accepting json
app.use(express.json({limit:"16kb"}));
// url-encoding
app.use(express.urlencoded({extended:true,limit:"16kb"}));
// to store assets
app.use(express.static("public"))

app.use(cookieParser());




export {app}