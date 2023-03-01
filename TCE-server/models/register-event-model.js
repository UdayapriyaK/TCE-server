const mongoose = require("mongoose");

const RegisterEventModel = new mongoose.Schema(
  {
    user: { type: String, required: true },
    userphonenumber: { type: String, default: "" },
    id: { type: String, required: true, default: "" },
    name: { type: String, required: true, default: "" },
    summary: { type: String, require: true, default: "" },
    date: {
      type: String,
      default: Date.now,
      require: true,
    },
    org: { type: String, require: true },
    dept: { type: String, require: true },
    cate: { type: String, require: true },
    venu: { type: String, require: true },
    type: { type: String, require: true },
    time: { type: String, require: true },
    cont: { type: String, require: true },
    desc: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("registered-event", RegisterEventModel);
