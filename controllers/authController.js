const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");



//*  LOGIN a user

const login = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  try {
    const queryResult = await pool.query(
      "SELECT user_id, user_email, user_password FROM app.users WHERE user_email = $1;",
      [email]
    );

    if (queryResult.rows == 0) {
      return res.status(404).send({
        message: "Wrong email or password.",
      });
    } else {
      // if user is found
      const userData = queryResult.rows[0];
      // check password
      await bcrypt.compare(
        password,
        userData.user_password,
        (err, response) => {
          if (response) {
            // if password matches sign with JWT and return success message
            const token = jwt.sign({ _id: userData.user_id }, keys.jwt.secret);
            // store the JWT token inside a httpOnly cookie (for XSS security reasons)
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
            });
            res.send({
              message: "Login successfull.",
            });
          } else {
            // if password does not matches return 404 and error
            if (err) {
              // if bcrypt produces an error, log it, otherwise keep going
              console.log(err);
            }
            res.status(404).send({
              message: "Wrong email or password.",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    // to delete the cookie we grab the cookie we want to delete, create an empty cookie and set maxAge to 0.
    // This way the cookie will expire immediately, thus leaving the user without a cookie (i.e. logged-out)
    res.cookie("jwt", "", {
      maxAge: 1, // 1 millisecond
    });

    res.send({
      message: "Logout successfull.",
    });
  } catch (error) {
    console.log(error);
  }
};



const verifyAuthStatus = async (req, res) => {
  try {
    res.send({ 
      message: "Authorized.",
      isAuth: true
    })
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  login,
  logout,
  verifyAuthStatus
};
