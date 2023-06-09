var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const app = require('../app');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/sign-up', user_controller.user_create_get);

router.post('/sign-up', user_controller.user_create_post);

router.post('/login', passport.authenticate('local', {successRedirect: "/",failureRedirect: "/"}))

router.get('/log-out', (req, res, next) => {
    req.logout(function (err) {
    res.redirect("/");
  });
})

router.post('/new-message', message_controller.message_create_post);


module.exports = router;
