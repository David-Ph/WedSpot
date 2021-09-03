const passport = require("passport"); // Import passport
const LocalStrategy = require("passport-local").Strategy; // Login but not using likes Google Login, Facebook Login
const bcrypt = require("bcrypt"); // to compare the password
const JWTstrategy = require("passport-jwt").Strategy; // to enable jwt in passport
const ExtractJWT = require("passport-jwt").ExtractJwt; // to extract or read jwt
const { User } = require("../../models"); // Import user
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

// Logic to signup
exports.register = (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: "Email has been used", statusCode: 401 });
    }

    if (!user) {
      return next({ message: "Email has been used", statusCode: 401 });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "user_email",
      passwordField: "user_password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = await User.create(req.body);

        return done(null, data, { message: "User can be created" });
      } catch (e) {
        return done(e, false, { message: "User can't be created" });
      }
    }
  )
);

// Logic to signin
exports.login = (req, res, next) => {
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 401 });
    }

    if (!user) {
      return next({ message: info.message, statusCode: 401 });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "user_email",
      passwordField: "user_password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = await User.findOne({ user_email: email });

        if (!data) {
          return done(null, false, { message: "User is not found!" });
        }

        const validate = await bcrypt.compare(password, data.user_password);

        if (!validate) {
          return done(null, false, { message: "Wrong password!" });
        }

        return done(null, data, { message: "Login success!" });
      } catch (e) {
        return done(e, false, { message: "User can't be created" });
      }
    }
  )
);

// Logic for user
exports.user = (req, res, next) => {
  passport.authorize("user", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: "User not logged in", statusCode: 403 });
    }

    if (!user) {
      return next({ message: "User not logged in", statusCode: 403 });
    }

    req.user = user;

    next();
  })(req, res, next);
};

passport.use(
  "user",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const data = await User.findOne({ _id: token.user });

        if (data) {
          return done(null, token);
        }

        return done(null, false, { message: "Forbidden access" });
      } catch (error) {
        return done(error, false, { message: "Forbidden access" });
      }
    }
  )
);

// exports.googleSignIn =

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let findUser = await User.findOne({ user_email: profile._json.email });

        if (!findUser) {
          newUser = await User.create({
            user_fullname: profile._json.name,
            user_email: profile._json.email,
            user_avatar: profile._json.picture,
          });
        }

        return cb(null, findUser);
      } catch (error) {
        return cb(error, false, { message: "Forbidden access" });
      }
    }
  )
);
// http://localhost:3000/user/auth/google
