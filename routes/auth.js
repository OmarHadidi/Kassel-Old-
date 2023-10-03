const { Router } = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Sequelize, Transaction } = require("sequelize");
const { errors, log } = require("../config");
const { UserCreds, User } = require("../config").models;

const router = Router();

router.get("/login", (req, res, next) => {
    res.render("login");
});
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })
);
router.get("/signup", (req, res, next) => {
    log.dump("flash", req.flashes);
    log.dump("locals", res.locals);
    res.render("signup");
});
router.post("/signup", async (req, res, next) => {
    const { name, email, username, password } = req.body;
    // find uname, if exists => Flash Error: Username exists
    const unameExist = await UserCreds.findOne({
        where: { username },
    });
    if (unameExist) {
        req.flash("error", errors.AlreadyExists("username"));
        req.flash("formData", req.body);
        return res.redirect("/auth/signup");
    }
    // hash pwd
    const hashedPwd = await bcrypt.hash(password, await bcrypt.genSalt(4));
    // store name, email, ..etc => Users
    const user = await User.create({ name, email });
    // store uname, pwd => UserCreds
    await user.createUserCred({ username, password: hashedPwd });
    res.send("ok");
    
    // TODO: Put them all in a Transaction
    // TODO: small parts (services)
    // TODO: Login and redirect
});

module.exports = router;
