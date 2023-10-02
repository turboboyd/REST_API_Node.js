const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  console.log('token: ', token);

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized1"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    console.log('user: ', user);
    console.log("user.token: ", user.token);
    console.log("token: ", token);

    console.log(user.token);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized2"));
    }

    req.user = user;
    console.log("req.user: ", req.user);
    next();
  } catch {
    next(HttpError(401, "haha"));
  }
};

module.exports = authenticate;
