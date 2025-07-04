import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId || String,
    ref:"Department",
    default:null
  },
  role:{
    type:String,
    enum:["user","authority","admin"],
    default:"user"
  },
  isActive:{
    type:Boolean,
    default:true
  }
},{timestamps:true});


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next()
})

UserSchema.methods.generateToken = async function() {
   return await jwt.sign({
        _id:this._id,
        role :this.role,
        name :this.fullname,
        email:this.email
    },process.env.JWT_SECRET)
};

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

const User = model("User",UserSchema);
export default User;
