const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyUser = (username, password, done) => {
    console.log("username :>> ", username);
    console.log("password :>> ", password);

    // TODO: vreify from DB
    if (username == "omar" && password == "omar")
        return done(null, { username });
    done(null, false);
};

const localStrategy = new LocalStrategy({}, verifyUser);

const setupPassport = () => {
    passport.use(localStrategy);
};

module.exports = {
    setupPassport,
    localStrategy,
};
