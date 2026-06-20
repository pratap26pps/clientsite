import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true },
    electricityBill: { type: String, required: true },
    billFileUrl: { type: String, default: null },
    billFileName: { type: String, default: null },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
