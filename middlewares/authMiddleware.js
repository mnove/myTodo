const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// VERIFY JWT middleware
const verifyJWT = (req, res, next) => {
  // get the cookie with the jwt in it
  const cookie = req.cookies["jwt"];

  // verify the jwt token from the cookie
  jwt.verify(cookie, keys.jwt.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: "You are not authorized to access this property.",
        isAuth: false,
      });
    } else {
      //decode the JWT and get the _id value
      const userId = decoded._id;

      // attach the userId to the request object (for the next step in the middleware chain)
      req.userId = userId;
      console.log("User Verification Successfull.");
      next();
    }
  });
};

module.exports = {
  verifyJWT,
};
