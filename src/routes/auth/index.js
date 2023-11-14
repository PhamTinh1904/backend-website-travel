const express = require("express");
const AuthController = require("../../controllers/authController");
const router = express.Router();
// const passport = require('passport');

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.Login);
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.                 
//     res.redirect("/");
//   }
// );

module.exports = router;
