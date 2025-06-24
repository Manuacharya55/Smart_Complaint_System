import mongoose, { Schema,model } from "mongoose";

const StateSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    districts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"District"
    }]
});

const State = model("State",StateSchema);
export default State;