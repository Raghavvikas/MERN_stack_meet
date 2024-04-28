const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

const nodeMailer = require("nodemailer");
const randStr = require("randomstring");
// const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const Parent = require("../models/parentModel.js");
// const config = require("../config/db.js");

const config = {
  JWT_SECRET: "sparkbrains",
  emailUser: "spark.brains0007@gmail.com",
  emailPass: "bquxrsdewdxplcaz",
};

// Parent.find().populate("parent_id");

const sendMail = async (name, email, title, token) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });
    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject:
        title === "reset"
          ? "Reset Password Link!"
          : title === "registration"
          ? "Congratulation! Registration Successful!!"
          : title === "Password changed"
          ? "Congratulation! Password Reset Successful!!"
          : null,
      html:
        title === "reset"
          ? `<h4>Hi ${name},</h4>

            <p>There was a request to change your password!</p>
            <p>If you did not make this request then please ignore this email.</p>

            <p>Otherwise, please click this link to change your password: <a href="http://localhost:3000/reset-password/?token=${token}">click here</a></p>

            <p>Regards,</p>
            <p>The SparkPet team</p>`
          : title === "registration"
          ? `<h4>Dear ${name},</h4>
            <p>Thank you for completing your registration with <em>SparkPet.</em></p>
            <p>This email serves as a confirmation that your account is activated and that you are officially a part of the <em>SparkPet</em> family.</p>
            <p>Please <a href='http://localhost:3000/login'>click here</a> to redirect to login Page.</p>
            <p>Enjoy!</p>
            <p>Regards,</p>
            <p>The SparkPet team</p>`
          : title === "Password changed"
          ? `<h4> Hello ${name},</h4>
            <p>You have successfully changed your password!</p>
            <p> Please <a href='http://localhost:3000/login'>click here</a> to redirect to login Page. </p>
            <p>Regards,</p>
            <p>The SparkPet team</p>`
          : null,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent to: ", mailOptions.to);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { parent_name, pet_name, phone, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    parent_name,
    pet_name,
    email,
    phone,
    password,
  });

  if (user) {
    const title = "registration";
    sendMail(req.body.parent_name, req.body.email, title);
    res.status(200).json({
      _id: req.body._id,
      parent_name: req.body.parent_name,
      pet_name: req.body.pet_name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ success: false, message: "User not found." });
    throw new Error("User not found");
  }
});

//@description     secure the password by encryption
//@route           POST /api/users/
//@access          Public

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//@description     forget password request
//@route           POST /api/users/forget-password
//@access          Public

const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  try {
    const verifyMail = await User.findOne({ email: email });

    if (verifyMail) {
      const str = generateToken(verifyMail._id);
      console.log(verifyMail);
      const data = await User.updateOne(
        { email: email },
        { $set: { token: str } }
      );
      const title = "reset";

      sendMail(verifyMail.parent_name, verifyMail.email, title, str);

      res.status(200).json({
        success: true,
        token: str,
        message: "A link to reset your password has sent on your email!",
      });
    } else {
      res
        .status(510)
        .json({ success: false, message: "Email address does not exists!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

//@description     change password after getting email
//@route           PUT /api/users/
//@access          Public

const changePassword = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const tokenData = await User.findOne({ token: token });
    console.log(tokenData);
    if (tokenData) {
      const pass = req.body.password;
      const newPass = await securePassword(pass);
      const data = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPass, token: "" } },
        { new: true }
      );
      const title = "Password changed";
      sendMail(tokenData.parent_name, tokenData.email, title);

      res.status(200).json({
        success: true,
        message: "Your Password has been reset successfully!!",
        data: data,
      });
    } else {
      res
        .status(401)
        .json({ success: true, message: "Token has been expired." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const userProfile = await Parent.find({parent_id: user._id}).populate('parent_id')
    user.parent_name = req.body.parent_name || user.parent_name;
    user.pet_name = req.body.pet_name || user.pet_name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();



    res.json({
      _id: updatedUser._id,
      parent_name: updatedUser.parent_name,
      pet_name: updatedUser.pet_name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      // isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  authUser,
  updateUserProfile,
  registerUser,
  forgotPassword,
  changePassword,
};
