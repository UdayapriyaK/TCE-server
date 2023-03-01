const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
require("dotenv").config()

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

const adminAccess = (permission) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified.user;

      // userModel.find()

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ errorMessage: "Unauthorized" });
    }
  };
};

const authToken = async (req, res, next) => {
  // Option 1
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer Token

  // Option 2
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({errors: "Token not found"});
  }

  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user.email;
    next();
  } catch (error) {
    res.status(403).json({msg: "Invalid token"});
  }
};
module.exports = { auth, adminAccess, authToken };