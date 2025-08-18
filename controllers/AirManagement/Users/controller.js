const User = require("../../../models/User");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, memId, mobile, email, password,userType } = req.body;

    // check for duplicate memId
    const existingMemId = await User.findOne({ memId });
    if (existingMemId) {
      return res.status(400).json({ status: false, message: "Member ID already exists" });
    }

    // check for duplicate email
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    const newUser = new User({ firstName, lastName, memId, mobile, email, password,userType });
    await newUser.save();

    res.status(201).json({ status: true, data: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
   return res.status(200).json({ status: true, data: users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const {password,email}=req.body
    const user = await User.findOne({email:email});
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });
    res.status(200).json({
      success:true,
      message:"Login Successfully",
      user:user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, memId, mobile, email, password,userType } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.memId = memId || user.memId;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;
    user.password = password || user.password;
    user.userType = userType || user.userType
;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
