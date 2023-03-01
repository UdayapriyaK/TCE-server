const bcrypt = require("bcryptjs");
const UserModel = require("../models/user-model");
const ImageModal = require("../models/image-model")
const { sign, verify } = require("jsonwebtoken");
const { createAccessTokens, createRefreshTokens } = require("../jwt/JWT");
const multer = require("multer");

register = (req, res) => {
  const { email, password } = req.body;

  UserModel.find({ email }, (err, foundUsers) => {
    if (err) throw err;
    if (foundUsers.length !== 0) {
      return res.status(400).json({ error: "User already exists" });
    }
  });

  bcrypt.hash(password, 10).then((hash) => {
    const user = new UserModel({ email, password: hash, isAdmin: false });
    user
      .save()
      .then(() => {
        return res.status(200).json("User registered");
      })
      .catch((err) => {
        if (err) return res.status(400).json({ error: err });
      });
  });
};

let refreshTokens = [];
login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }, (err, foundUser) => {
    if (err) throw err;
    if (!foundUser) {
      return res.status(400).json({ err: "User not exists" });
    }

    const dbPassword = foundUser.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        return res.status(400).json({ err: "Email and password mismatch" });
      } else {
        const accessToken = createAccessTokens(foundUser);
        const refreshToken = createRefreshTokens(foundUser);
        refreshTokens.push(refreshToken);

        return res.json({ foundUser, accessToken, refreshToken });
      }
    });
  });
};

newacesstoken = async (req, res) => {
  // const refreshToken = req.header("x-auth-token");
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.status(401).json({ error: "Token not found!!" });

  if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ error: "Invalid refresh token!!" })

  try {

    const user = await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { email, id } = user;
    // console.log(user)
    const accessToken = await sign({ email, id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
    return res.status(200).json({ accessToken });

  } catch (error) {
    res.status(403).json({ error: "Invalid Token" })
  }
};

logout = (req, res) => {
  const refreshToken = req.header("x-auth-token");
  refreshTokens = refreshTokens.filter(token => token !== refreshToken)
  res.sendStatus(204);
};

updateUser = (req, res) => {
  const { email, updated } = req.body;
  // console.log(email);
  // console.log(updated);

  UserModel.findOneAndUpdate(
    { email },
    {
      name: updated.name,
      phonenumber: updated.phonenumber,
      regno: updated.regno,
    }
  )
    .then(() => {
      return res.status(200).json("Profile Updated!!");
    })
    .catch((err) => {
      if (err) return res.status(400).json({ error: err });
    });
};

const Storage = multer.diskStorage({    //
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).single('testImage');

uploadImage = (req,res) => {
  upload(req,res, (err) => {
    if (err) throw err;
    else{
      const newImage = new ImageModal({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType:'image/png'
        }
      })

      newImage.save().then(res => res.json("Successfully uploaded")).catch(err => console.log(err));

    }
  })
}

getProfile = (req, res) => {
  res.send(req.authenticated);
};

module.exports = { register, login, getProfile, updateUser, newacesstoken, logout ,uploadImage};
