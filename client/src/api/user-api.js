import resolve from "../utils/resolver";


const axios = require("axios").create({
  baseURL: "http://localhost:5000/",
});

export const userApi = {
  /**
   * login user with credentials (JWT)
   * @param {string} email
   * @param {string} password
   */

  login: async function (email, password) {
    let loggingUser = {
      email: email,
      password: password,
    };

    console.log("loggin user", loggingUser);

    return await resolve(
      axios({
        method: "POST",
        url: "api/auth/login",
        data: loggingUser,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

   /**
   * Check and verify if the user is logged in and authorized
   */

    verifyUserIsLoggedIn: async function () {
  
      return await resolve(
        axios({
          method: "GET",
          url: "api/auth/verify-auth",
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },

  /**
   * Get the user's data
   */

  // getUserData: async () => {

  //   return await resolve(
  //     axios({
  //       method: "GET",
  //       url: "api/user",
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: "include", // to get the cookie in every request
  //     }).then((res) => {
  //       return res.data;
  //     })
  //   );
  // },


  /**
   * Register a new user
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   */

  register: async function (firstName, lastName, email, password) {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    return await resolve(
      axios({
        method: "POST",
        url: "api/register",
        data: newUser,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

  /**
   * logout the user
   */

  logout: async function () {
    return await resolve(
      axios({
        method: "GET",
        url: "api/auth/logout",
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },


};
