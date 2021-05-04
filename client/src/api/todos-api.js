import resolve from "../utils/resolver";

const axios = require("axios").create({
  baseURL: "http://localhost:5000/",
});

export const tasksApi = {
  /**
   * list of the todos of the logged-in user
   */

  getAll: async function () {
    return await resolve(
      axios({
        method: "GET",
        url: "api/todo",
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

  /**
   * create a new todo
   */

  createOne: async function () {

    let newnewTodoUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };


    return await resolve(
      axios({
        method: "POST",
        url: "api/todo",
        data: newTodo,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },
};
