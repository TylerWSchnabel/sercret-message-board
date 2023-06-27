var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const app = require('../app');
const passport = require('passport');

/* GET home page. */
router.get('/', message_controller.message_list);

router.get('/sign-up', user_controller.user_create_get);

router.post('/sign-up', user_controller.user_create_post);

router.post('/login', passport.authenticate('local', {successRedirect: "/",failureRedirect: "/"}))

router.get('/log-out', user_controller.user_logout);

router.post('/new-message', message_controller.message_create_post);

//router.get('/message_list', message_controller.message_list);

console.log(message_controller.message_list[0])

module.exports = router;
