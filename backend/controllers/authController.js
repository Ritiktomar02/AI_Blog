const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt=require("bcryptjs")
const {uploadToCloudinary} = require("../middleware/uploadMiddleware")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, bio, adminAccessToken } = req.body;
    let profileImageUrl = null;

    if (req.files && req.files.image) {
      profileImageUrl = await uploadToCloudinary(req.files.image, "user_profiles");
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let role = "member";
    if (adminAccessToken && adminAccessToken === process.env.ADMIN_ACCESS_TOKEN) {
      role = "admin";
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      profileImageUrl,
      bio,
      role,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" , error: err.message});
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user._id,
      name:user.name,
      email:user.email,
      profileImageUrl:user.profileImageUrl,
      role:user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" , error: err.message});
  }
};

exports.getInfoUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};