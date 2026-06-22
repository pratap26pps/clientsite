import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    savings: { type: String, trim: true, default: null },
    system: { type: String, trim: true, default: null },
    photoUrl: { type: String, default: null },
    photoFileName: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ rating: -1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
