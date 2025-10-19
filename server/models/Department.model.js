import {Schema,model} from "mongoose";

const DepartmentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    members:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
},{timestamps:true});

const Department = model("Department",DepartmentSchema);

export default Department;