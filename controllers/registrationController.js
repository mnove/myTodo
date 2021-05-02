const pool = require("../db");
const bcrypt = require("bcrypt");

const register_new_user = async (req, res) => {

  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;


  try {
    const checkIfUserExists = await pool.query(
      "SELECT user_email FROM app.users WHERE user_email = $1;",
      [email]
    );

    if (checkIfUserExists.rows == 0) {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      console.log(req.body);

      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await pool.query(
        "INSERT INTO app.users (user_first_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, hashedPassword]
      );

      res.status(201).send({
        message: "User created successfully.",
      });
    } else {
      return res.status(404).send({
        message: "Email already in use. Choose another one or login instead.",
      });
    }
  } catch (error) {
    console.log(error);
  }
  



};



module.exports = {
    register_new_user,

  };
  