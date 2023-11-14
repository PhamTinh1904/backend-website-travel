const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token = await req.cookies.accessToken;  
  await console.log('cookie', req.cookies)  

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(err)
        .json({ success: false, message: "token is invalid" });
    }

    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not user" });
    }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not authorized" });
    }
  });
};

module.exports = {
  verifyUser,
  verifyAdmin,
};
