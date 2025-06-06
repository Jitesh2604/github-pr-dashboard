import passport from "passport";
import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
},
(accessToken, refreshToken, profile, done) => {
    const user = {
        username: profile.username,
        id: profile.id,
        token: accessToken,
    };
    return done(null, user);
}));