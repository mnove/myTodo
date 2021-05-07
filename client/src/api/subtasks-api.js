import resolve from "../utils/resolver";

const axios = require("axios").create({
  baseURL: "http://localhost:5000/",
});

export const subtasksApi = {


  /**
   * create a new subtask
   * @param {string} taskId
   *  @param {string} description
   */

  createOne: async function (taskId, description) {

    let newSubtask = {
      description: description
    };


    return await resolve(
      axios({
        method: "POST",
        url: `api/subtasks/${taskId}`,
        data: newSubtask,
        headers: { "Content-Type": "application/json" },
        withCredentials: "include", // to get the cookie in every request
      }).then((res) => {
        return res.data;
      })
    );
  },



   /**
   * get a subtask by subtaskId
   * @param {string} subtaskId
   */

    getOne: async function (subtaskId) {

      return await resolve(
        axios({
          method: "GET",
          url: `api/subtasks/${subtaskId}`,
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },


    /**
   * get a subtask by subtaskId
   * @param {string} newDescription
   * @param {string} subtaskId 
   */
     updateOne: async function (subtaskId, newDescription) {

      let updatedSubtask = {
        description: newDescription
      }

      return await resolve(
        axios({
          method: "PUT",
          url: `api/subtasks/${subtaskId}`,
          data: updatedSubtask,
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },

    
    /**
   * delete a subtask by subtaskId
   * @param {string} subtaskId 
   */
     deleteOne: async function (subtaskId) {

      return await resolve(
        axios({
          method: "DELETE",
          url: `api/subtasks/${subtaskId}`,
          headers: { "Content-Type": "application/json" },
          withCredentials: "include", // to get the cookie in every request
        }).then((res) => {
          return res.data;
        })
      );
    },

};
