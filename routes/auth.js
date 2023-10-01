const {Router} = require('express');
const passport = require('passport');

const router = Router();

router.get("/login", (req,res, next) => {
    res.render("login");
})
router.post('/login', passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
}));

module.exports = router;
