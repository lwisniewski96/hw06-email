const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../services/schemas/user");
const Joi = require("joi");
const gravatar = require("gravatar");
const nodemailer = require("nodemailer");

const generateNewVerificationToken = () => {
  const { v4: uuidv4 } = require("uuid");
  return uuidv4();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Generowanie URL-a avatara przy użyciu Gravatara
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

    const newUser = new User({
      email,
      password,
      avatarURL,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    newUser.subscription = "starter";

    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = req.user;
    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};
// Nowa funkcja do wysyłania emaila z verificationToken
const sendVerificationEmail = async (email, verificationToken) => {
  // Konfiguracja transportera nodemailera
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Ustawienia treści wiadomości
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification Email",
    text: `Click the following link to verify your email: http://your_api_base_url/users/verify/${verificationToken}`,
  };

  // Wysłanie emaila
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Nowa funkcja do ponownego wysyłania emaila z verificationToken
const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate({ email });
    if (error) {
      return res.status(400).json({ message: "Missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    // Generowanie nowego verificationToken
    const newVerificationToken = generateNewVerificationToken();

    // Aktualizacja verificationToken w bazie danych
    user.verificationToken = newVerificationToken;
    await user.save();

    // Wysłanie emaila z nowym verificationToken
    sendVerificationEmail(email, newVerificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  current,
  signup,
  logout,
  verifyUser,
  resendVerificationEmail,
};
