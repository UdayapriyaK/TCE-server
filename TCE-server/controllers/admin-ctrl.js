const { CallPage } = require("twilio/lib/rest/api/v2010/account/call");
const EventModel = require("../models/event-model");
require("dotenv").config();

const twilio = require("twilio")(
  process.env.TWILIO_AUTH_ID,
  process.env.TWILIO_AUTH_TOKEN,
  { lazyLoading: true }
);

const sendSMS = (receiver, msg) => {
  twilio.messages
    .create({
      body: msg,
      to: receiver,
      from: "+18126322278",
    })
    .then((res) => console.log('Notified'))
    .catch((err) => console.log(err));
};

notifyParticipants = (req, res) => {
  const canNotify = req.body.notify;
  const phonenumbers = req.body.phonenos;
  const eventName = req.body.eventname;
  const msg = "Hey!! Remainder for Event that you registered : " + eventName + ".";

  if (canNotify) {
    //console.log(phonenumbers)
    phonenumbers.map((phonenum) => {
      receiver="+91" + phonenum;
    //   console.log(receiver)
    //   console.log(msg);
      sendSMS(receiver,msg)
    });
  }
};

addEvent = (req, res) => {
  EventModel.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
};

module.exports = { addEvent, notifyParticipants };
