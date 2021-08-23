const passport = require("passport"); // Import passport
const LocalStrategy = require("passport-local").Strategy; // Login but not using likes Google Login, Facebook Login
const bcrypt = require("bcrypt"); // to compare the password
const JWTstrategy = require("passport-jwt").Strategy; // to enable jwt in passport
const ExtractJWT = require("passport-jwt").ExtractJwt; // to extract or read jwt
const { vendor } = require("../../models"); // Import vendor

// Logic to register
exports.register = (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, vendor, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 401 });
    }

    if (!vendor) {
      return next({ message: info.message, statusCode: 401 });
    }

    req.vendor = vendor;

    next();
  })(req, res, next);
};

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "vendor_email",
      passwordField: "vendor_password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = await vendor.create(req.body);

        return done(null, data, { message: "Vendor can be created" });
      } catch (e) {
        return done(e, false, { message: "Vendor can't be created" });
      }
    }
  )
);

// Logic to login
exports.login = (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, vendor, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 401 });
    }

    if (!vendor) {
      return next({ message: info.message, statusCode: 401 });
    }

    req.vendor = vendor;

    next();
  })(req, res, next);
};

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "vendor_email",
      passwordField: "vendor_password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = await vendor.findOne({
          vendor_email: req.body.vendor_email,
        });

        if (!data) {
          return done(null, false, { message: "Vendor is not found!" });
        }

        const validate = await bcrypt.compare(password, data.vendor_password);

        if (!validate) {
          return done(null, false, { message: "Wrong password!" });
        }

        return done(null, data, { message: "Login success!" });
      } catch (e) {
        /* istanbul ignore next */
        return done(e, false, { message: "Vendor can't be created" });
      }
    }
  )
);

// // Logic for admin
// exports.admin = (req, res, next) => {
//   passport.authorize("admin", { session: false }, (err, user, info) => {
//     if (err) {
//       return next({ message: err.message, statusCode: 403 });
//     }

//     if (!user) {
//       return next({ message: info.message, statusCode: 403 });
//     }

//     req.user = user;

//     next();
//   })(req, res, next);
// };

// passport.use(
//   "admin",
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         const data = await user.findOne({ _id: token.user });

//         if (data.role === "admin") {
//           return done(null, token);
//         }

//         return done(null, false, { message: "Forbidden access" });
//       } catch (error) {
//         return done(error, false, { message: "Forbidden access" });
//       }
//     }
//   )
// );

// Logic for vendor
exports.vendor = (req, res, next) => {
  passport.authorize("vendor", { session: false }, (err, vendor, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 403 });
    }

    if (!vendor) {
      return next({ message: info.message, statusCode: 403 });
    }

    req.vendor = vendor;

    next();
  })(req, res, next);
};

passport.use(
  "vendor",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const data = await vendor.findOne({ _id: token.user });
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

// // Logic for admin or user
// exports.adminOrUser = (req, res, next) => {
//   passport.authorize("adminOrUser", { session: false }, (err, user, info) => {
//     if (err) {
//       return next({ message: err.message, statusCode: 403 });
//     }

//     if (!user) {
//       return next({ message: info.message, statusCode: 403 });
//     }

//     req.user = user;

//     next();
//   })(req, res, next);
// };

// passport.use(
//   "adminOrUser",
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         const data = await user.findOne({ _id: token.user });

//         if (data.role === "admin" || data.role === "user") {
//           return done(null, token);
//         }

//         return done(null, false, { message: "Forbidden access" });
//       } catch (error) {
//         return done(error, false, { message: "Forbidden access" });
//       }
//     }
//   )
// );

exports.sameVendor = (req, res, next) => {
  passport.authorize("sameVendor", { session: false }, (err, vendor, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 403 });
    }

    if (!vendor) {
      return next({ message: info.message, statusCode: 403 });
    }

    if (info.message == "vendor" && vendor.vendor !== req.params.id) {
      return next({ message: "Forbidden access", statusCode: 403 });
    }

    req.vendor = vendor;

    next();
  })(req, res, next);
};

passport.use(
  "sameVendor",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const data = await vendor.findOne({ _id: token.user });

        if (data.role === "vendor") {
          return done(null, token, { message: "vendor" });
        }

        return done(null, false, { message: "Forbidden access" });
      } catch (error) {
        return done(error, false, { message: "Forbidden access" });
      }
    }
  )
);
