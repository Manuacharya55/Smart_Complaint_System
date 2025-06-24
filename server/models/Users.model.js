import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "authority"],
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.createToken = async function () {
  return jwt.sign({
    name: this.name,
    _id: this._id,
    role: this.role,
  },process.env.JWT_SECRET);
};

UserSchema.methods.checkPassword = async function(password){
    return bcrypt.compare(password,this.password);
}

const User = model("User", UserSchema);
export default User;
