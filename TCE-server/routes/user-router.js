const express = require("express");
const UserCtrl = require("../controllers/user-ctrl");
const regEvent = require("../models/register-event-model");
const router = express.Router();
const Event = require("../models/event-model");
router.post("/register", UserCtrl.register);
router.post("/login", UserCtrl.login);
router.post("/updateUser", UserCtrl.updateUser);
router.post("/token", UserCtrl.newacesstoken);
router.delete("/logout", UserCtrl.logout);
router.post("/uploadImage", UserCtrl.uploadImage);

router.get("/eve", (req, res) => {
  Event.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});
router.post("/register-eve", (req, res) => {
  const {
    user,
    userphonenumber,
    id,
    name,
    summary,
    date,
    org,
    dept,
    cate,
    venu,
    type,
    time,
    cont,
    desc,
  } = req.body;
  regEvent.find({user:user,name:name},(err,result)=>{
    if(result.length!==0){
      res.send('400')
    }
    else{
     const  newEvent = new regEvent({
        user,
        userphonenumber,
        id,
        name,
        summary,
        date,
        org,
        dept,
        cate,
        venu,
        type,
        time,
        cont,
        desc,
      });
      //console.log(newEvent);
      newEvent.save().then(()=>{console.log("saved")
      res.send('200')
    });
    }

  })
  
});

router.post("/reg-eve", (req, res) => {
  const { user } = req.body;
  regEvent.find({ user: user }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

module.exports = router;
