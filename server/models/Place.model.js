import { Schema, model } from "mongoose";

const PlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Place = model("Place", PlaceSchema);

export default Place;
