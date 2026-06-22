import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    postcode: { type: String, trim: true, default: null },
    electricityBill: { type: String, default: null },
    email: { type: String, trim: true, default: null },
    service: { type: String, trim: true, default: null },
    address: { type: String, trim: true, default: null },
    message: { type: String, trim: true, default: null },
    source: {
      type: String,
      enum: ["website", "package"],
      default: "website",
    },
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
