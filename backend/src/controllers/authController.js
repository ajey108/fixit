import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//Register
export const Register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  //if user alredy exists
  const existingUser = await User.findOne({ email }, { username });

  if (existingUser) {
    return res.status(400).json({ message: "user already exists" });
  }

  //password vlaidation
  if (password.length < 4) {
    return res
      .status(400)
      .json({ message: "password should be more than 4 characters" });
  }

  //hashpasword
  const salt = await bcrypt.genSalt(10);
  const hashpasword = await bcrypt.hash(password, salt);

  //if not create a new user
  try {
    const newuser = new User({
      username,
      email,
      password: hashpasword,
      profile: "https://xsgames.co/randomusers/avatar.php?g=pixel",
    });

    //save to db
    await newuser.save();
    res.status(201).json({ message: "user has been registered" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error creating user", error });
  }
};

//login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Something went wrong" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({ message: "Invalid credentials" });
    }

    //generate token

    const token = await JWT.sign({ id: user._id }, process.env.secret, {
      expiresIn: "1d",
    });

    //send user
    res.status(200).send({
      success: true,
      message: "Login successfull",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "Error Loging In" });
  }
};
