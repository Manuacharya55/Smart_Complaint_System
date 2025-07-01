import mongoose, { Schema,model } from "mongoose";

const StateSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
type:Boolean,
default:true
    },
    districts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"District"
    }]
});

const State = model("State",StateSchema);
export default State;