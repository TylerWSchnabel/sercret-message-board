const Message = require("../models/message");
const async = require("async");
const app = require("../app");
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');

exports.message_create_post = [
    body("message", "Message can not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            user: req.user.username,
            message: req.body.message,
            time: new Date()
        })

        message.save((err) => {
            if(err){
                return next(err);
            }
            res.redirect("/");
        })
    }
]


exports.message_list = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}, "user message time")
        .sort({ time: -1 })
        .exec();
    
    res.render("index", { message_list: allMessages, user: req.user  });
    });