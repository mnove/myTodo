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
        url: "api/tasks",
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },

  /**
   * create a new task
   * @param {string} description
   */

  createOne: async function (description) {

    let newTask = {
      description: description
    };


    return await resolve(
      axios({
        method: "POST",
        url: "api/tasks",
        data: newTask,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },



   /**
   * get a task by taskId
   * @param {string} taskId
   */

    getOne: async function (taskId) {

      return await resolve(
        axios({
          method: "GET",
          url: `api/tasks/${taskId}`,
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },


    /**
   * get a task by taskId
   * @param {string} newDescription
   * @param {string} taskId 
   */
     updateOne: async function (newDescription, taskId) {

      let updatedTask = {
        description: newDescription
      }

      return await resolve(
        axios({
          method: "PUT",
          url: `api/tasks/${taskId}`,
          data: updatedTask,
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },

    
    /**
   * delete a task by taskId
   * @param {string} taskId 
   */
     deleteOne: async function (taskId) {

      return await resolve(
        axios({
          method: "DELETE",
          url: `api/tasks/${taskId}`,
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },


 
















};
