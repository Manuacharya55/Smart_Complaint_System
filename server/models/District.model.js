import mongoose, { Schema,model } from "mongoose";

const DistrictSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"State"
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const District = model("District",DistrictSchema);
export default District;