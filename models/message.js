const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: '', 
    message: { type: String, required: true},
    time: ''
  });

MessageSchema.virtual("url").get(function () {
return `/messsage/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);