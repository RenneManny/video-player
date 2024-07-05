   import mongoose, { Schema } from "mongoose";
   import jwt  from "jsonwebtoken";
   import bcrypt from "bcrypt"
   const userSchema=new mongoose.Schema({
 username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
     
 },
 email:{
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    trim:true,
 },
 password:{
    type:String,
    required:[true,'Password is required '],
 },
 fullName:{
    type:String,
    required:true,
    // unique:true,
  
    trim:true,
    index:true
     
 },
 avatar:{
    type:String, //cloudnary ka url ayega 
    require:true,

 },
 coverImage:{
    type:String, //cloudnary ka url ayega 
    // require:true,
    
 },
 watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
 ],
refreshToken:{
    type:String
},


   },{timestamps:true});

   userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password=bcrypt.hash(this.password,12)
    }

    next();
   })
//    custommethhods
userSchema.methods.isPasswordCorrect=async function(password){
    return  await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken=function(){
   return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.refershToken=function(
){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

   
const User=mongoose.model("User",userSchema);
module.exports=User;