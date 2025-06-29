import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
