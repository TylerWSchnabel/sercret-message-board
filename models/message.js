const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, }
  });

MessageSchema.virtual("url").get(function () {
return `/messsage/${this._id}`;
});