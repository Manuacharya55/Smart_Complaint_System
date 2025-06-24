import mongoose, { Schema,model } from "mongoose";

const DepartmentSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    workers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
});

const Department = model("Department",DepartmentSchema);
export default Department;