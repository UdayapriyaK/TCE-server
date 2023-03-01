const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, default: ""},
        name: { type: String, default: "" },
        phonenumber: { type: String, default: "" },
        regno: { type: String, default: "" },
        isAdmin: { type: Boolean, required: false },
        role: { type: String, default: "" }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
