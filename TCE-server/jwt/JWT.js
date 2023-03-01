const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createAccessTokens = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d"
  }
  );

  return accessToken;
};

const createRefreshTokens = (user) => {
  const refreshToken = sign(
    { email: user.email, id: user.id },
    process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d"
  }
  );

  return refreshToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!!" });

  try {
    const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createAccessTokens, createRefreshTokens, validateToken };
