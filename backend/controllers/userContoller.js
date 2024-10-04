import User from "../models/user.js";
import passport from "passport";

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const registerUser = (req, res) => {
  console.log(req.body);

  User.register(
    { username: req.body.email, name: req.body.name },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Registration failed", error: err });
      } else {
        req.login(user, function (loginErr) {
          if (loginErr) {
            console.error("Login error:", loginErr);
            return res.status(400).json({
              msg: "Login after registration failed",
              error: loginErr,
            });
          }
          res.json({ msg: "Authenticated and logged in successfully" });
        });
      }
    }
  );
};

const loginUser = (req, res) => {
  const user = new User({
    username: req.body.email,
    password: req.body.password,
  });
  req.login(user, function (loginErr) {
    if (loginErr) {
      console.error("Login error:", loginErr);
      return res.status(400).json({
        msg: "Login failed",
        error: loginErr,
      });
    }
    res.json({ msg: "Authenticated and logged in successfully" });
  });
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).send({ msg: "Failed to log user out" });
    }
    req.session.destroy((err) => {
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      });
      res.status(200).send({ msg: "Session terminated" });
    });
  });
};

const fetchUserProfile = async (req, res) => {
  try {
    const userProfile = await User.find({ username: req.params.userId });
    res.json(userProfile[0]);
  } catch (error) {}
};

export { registerUser, loginUser, logoutUser, fetchUserProfile };
