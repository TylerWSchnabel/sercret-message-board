const User = require("../models/user");
const Message = require("../models/message");
const async = require("async");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const app = require("../app");

exports.user_create_get = (req, res) => {
    res.render("sign-up", {title: "Join the club!"});
  };

exports.user_create_post = [
    body("username")
        .trim()
        .isLength({min:1})
        .escape()
        .withMessage("Username is required"),
    body("password")
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage("Password must be 5 characters"),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
        }),

        async (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                res.render('sign-up', {
                    title: "Sign Up!",
                    username: req.body,
                    errors: errors.array(),
                });
                return;
            }
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                res.render('sign-up', {
                    title: 'Sign up',
                    errors: [{msg: 'Username already exists'}],
                })
            } else { 
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
            });
            await user.save((err) => {
                if (err) {
                  return next(err);
                }
                // Successful - redirect to new Artist record.
                res.redirect('/');
              });
        }
    }
]

