import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  image: {
    type: String,
    default: "",
  },
  location: {
    city: { type: String },
    zip: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tags: [
    {
      type: String,
      enum: ["Electricity", "Water", "Road", "Garbage", "Other"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Issue", IssueSchema);
