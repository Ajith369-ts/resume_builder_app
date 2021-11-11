const User = require("../models/user");
const Details = require("../models/details");

const { ObjectId } = require('mongodb');
const passport = require("passport");

exports.getRegister = (req, res, next) => {
    res.render("auth/register", {
        pageTitle: "create Account"
    })
}

exports.postRegister = (req, res, next) => {

    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {

                const details = new Details({
                    userId: req.user
                });
                return details.save().then(() => {
                    res.redirect("/details");
                })
            })
        }
    });
}

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "sign in"
    })
}

exports.postLogin = (req, res, next) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/details");
            })
        }
    })
}

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect("/");
}