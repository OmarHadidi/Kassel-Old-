const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyUser = (username, password, done) => {
    console.log("username :>> ", username);
    console.log("password :>> ", password);

    // TODO: vreify from DB
    if (username == "omar" && password == "omar")
        return done(null, { id:1 });
    done(null, false);
};

const localStrategy = new LocalStrategy({}, verifyUser);

const setupPassport = () => {
    passport.use(localStrategy);
    passport.serializeUser((user, done) => {
        const {id} = user;
        done(null, {userId: id});
    });
    passport.deserializeUser((id, done) => {
        // TODO: get real data from DB
        const user = {id, username: 'omar'};
        done(null, user);
    })
};

module.exports = {
    setupPassport,
    localStrategy,
};
