import mongoose, { Schema,model } from "mongoose";

const ComplaintSchema = new Schema({
    description:{
        type:String,
        required:true,
    },
    complaintType:{
        type:String,
        required:true,
        enum:["quick","moderate","delayed"]
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Department",
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:["pending","progress","completed"]
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    
});

const Complaint = model("Complaint",ComplaintSchema)

export default Complaint;