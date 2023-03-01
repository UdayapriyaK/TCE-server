const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    
    name: { type: String, require: true },
    date: {
        type: Date,
        default: Date.now,
        require: true
    },
    summary: { type: String, require: true },
    org: { type: String, require: true },
    dept: { type: String, require: true },
    cate: { type: String, require: true },
    venu: { type: String, require: true },
    type: { type: String, require: true },
    time: { type: String, require: true },
    cont: { type: String, require: true },
    desc: { type: String, require: true }
},
    { timestamps: true }
);

module.exports = mongoose.model("events", EventSchema);