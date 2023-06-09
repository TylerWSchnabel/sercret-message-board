const User = require("../models/user");
const Message = require("../models/message");
const async = require("async");
const app = require("../app");
const { body, validationResult } = require("express-validator");

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
        })

        message.save((err) => {
            if(err){
                return next(err);
            }
            res.redirect("/");
        })
    }
]