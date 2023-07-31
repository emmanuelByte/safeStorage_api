const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../helpers/AuthToken");
const { generateOTP } = require("../helpers/utils");
async function register(req, res) {
  try {
    const keys = ["name", "email", "password", "phoneNumber"];

    const validate = validateData(req.body, keys);
    if (validate.error === true) {
      return res
        .status(400)
        .json({ message: `${validate.key} ${validate.message}` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({ ...req.body, password: hashPassword });

    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json({ message: "user already exist" });
    }
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const keys = ["email", "password"];

    const validate = validateData(req.body, keys);
    if (validate.error === true) {
      return res
        .status(400)
        .json({ message: `${validate.key} ${validate.message}` });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    user.password = undefined;

    const token = generateToken(user);

    return res.status(201).json({
      message: "User logged in successfully",
      data: { ...user._doc, token },
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json({ message: "user already exist" });
    }
    res.status(400).json({ message: error.message });
  }
}

async function sendVerification(req, res) {
  try {
    const keys = ["email"];

    const validate = validateData(req.body, keys);
    if (validate.error === true) {
      return res
        .status(400)
        .json({ message: `${validate.key} ${validate.message}` });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const code = generateOTP();
    // TODO: send email

    // Database
    await User.updateOne(
      { _id: user._id },
      {
        otp: code,
      }
    );

    return res.status(201).json({
      message: "email sent successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function verifyUser(req, res) {
  try {
    const keys = ["email", "otp"];

    const validate = validateData(req.body, keys);
    if (validate.error === true) {
      return res
        .status(400)
        .json({ message: `${validate.key} ${validate.message}` });
    }
    const { otp } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!Number(otp)) {
      return res.status(400).json({ message: "Otp must be a number" });
    }

    if (otp !== user.otp) {
      return res.status(400).json({ message: "Incorrect Otp" });
    }

    // Database
    await User.updateOne(
      { _id: user._id },
      {
        otp: null,
        isVerified: true,
      }
    );

    return res.status(201).json({
      message: "User verified",
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      return res.status(400).json({ message: "user already exist" });
    }
    res.status(400).json({ message: error.message });
  }
}

async function getProfile(req, res) {
  try {
    const user = req.user;

    return res
      .status(200)
      .json({ message: "User Profile fetched successfully", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function validateData(data, keys) {
  const dataKeys = Object.keys(data); // ["email","password"]
  for (const key of keys) {
    // "name"
    if (!dataKeys?.includes(key)) {
      return { key, message: "is required", error: true };
    }
  }
  return {
    error: false,
  };
}

module.exports = { sendVerification, verifyUser };
module.exports.register = register;
module.exports.login = login;
module.exports.getProfile = getProfile;
