import {
  GET_ALL_TASKS_REQUEST,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_FAILURE,
  CREATE_NEW_TASK_REQUEST,
  CREATE_NEW_TASK_SUCCESS,
  CREATE_NEW_TASK_FAILURE,
  GET_A_TASK_REQUEST,
  GET_A_TASK_SUCCESS,
  GET_A_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE
} from "./tasksTypes";

import { tasksApi } from "../../api/tasks-api";

///////////////////////////////
// GET ALL TASKS

const getAllTasksRequest = () => {
  return {
    type: GET_ALL_TASKS_REQUEST,
  };
};

const getAllTasksSuccess = (data) => {
  return {
    type: GET_ALL_TASKS_SUCCESS,
    payload: data,
  };
};

const getAllTasksFailure = (error) => {
  return {
    type: GET_ALL_TASKS_FAILURE,
    payload: error,
  };
};

export const getAllTasks = () => {
  return async (dispatch) => {
    console.log("reached here in the dispatch actions");
    dispatch(getAllTasksRequest());

    const response = await tasksApi.getAll();

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(getAllTasksFailure(errorMsg));
    } else {
      const data = response.data;

      // Artificially slowing down the code execution to show loading screen in the component
      setTimeout(() => {
        dispatch(getAllTasksSuccess(data));
      }, 500);
    }
  };
};

///////////////////////////////
// CREATE A NEW TASK

const createNewTaskRequest = () => {
  return {
    type: CREATE_NEW_TASK_REQUEST,
  };
};

const createNewTaskSuccess = (data) => {
  return {
    type: CREATE_NEW_TASK_SUCCESS,
    payload: data,
  };
};

const createNewTaskFailure = (error) => {
  return {
    type: CREATE_NEW_TASK_FAILURE,
    payload: error,
  };
};

export const createNewTask = (newTaskDescription) => {
  return async (dispatch) => {
    console.log("reached here in the dispatch actions");
    dispatch(createNewTaskRequest());

    const response = await tasksApi.createOne(newTaskDescription);

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(createNewTaskFailure(errorMsg));
    } else {
      const data = response.data[0];
      console.log("this is the response payload", response.data)

      dispatch(createNewTaskSuccess(data));
    }
  };
};


// GET A TASK BY ID 

  // const getATaskRequest = () => {
  //   return {
  //     type: CREATE_NEW_TASK_REQUEST,
  //   };
  // };

  // const getATaskSuccess = (data) => {
  //   return {
  //     type: CREATE_NEW_TASK_SUCCESS,
  //     payload: data,
  //   };
  // };

  // const getATaskFailure = (error) => {
  //   return {
  //     type: CREATE_NEW_TASK_FAILURE,
  //     payload: error,
  //   };
  // };

  // export const getATask = (taskId) => {
  //   return async (dispatch) => {
  //     console.log("reached here in the dispatch actions");
  //     dispatch(getATaskRequest());

  //     const response = await tasksApi.getOne(taskId);

  //     if (response.error) {
  //       // console.log(response);
  //       console.log("MESSAGE: ", response.error.message);
  //       const errorMsg = response.error.message;
  //       dispatch(getATaskFailure(errorMsg));
  //     } else {
  //       const data = response.data[0];
  //       console.log("this is the response payload", response.data)

  //       dispatch(getATaskSuccess(data));
  //     }
  //   };
  // };



  // DELETE A TASK BY ID

const deleteTaskRequest = () => {
  return {
    type: DELETE_TASK_REQUEST,
  };
};

const deleteTaskSuccess = (data) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: data,
  };
};

const deleteTaskFailure = (error) => {
  return {
    type: DELETE_TASK_FAILURE,
    payload: error,
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    console.log("reached here in the dispatch actions");
    dispatch(deleteTaskRequest());

    const response = await tasksApi.deleteOne(taskId);

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(deleteTaskFailure(errorMsg));
    } else {
      const data = response.data[0].task_id;
      console.log("this is the response payload", response.data)

      dispatch(deleteTaskSuccess(data));
    }
  };
};

// UPDATE A TASK BY ID

const updateTaskRequest = () => {
  return {
    type: UPDATE_TASK_REQUEST,
  };
};

const updateTaskSuccess = (newDescription, taskId) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: data,
  };
};

const updateTaskFailure = (error) => {
  return {
    type: UPDATE_TASK_FAILURE,
    payload: error,
  };
};

export const updateTask = (newDescription, taskId) => {
  return async (dispatch) => {
    console.log("reached here in the dispatch actions");
    dispatch(updateTaskRequest());

    const response = await tasksApi.updateOne(newDescription, taskId);

    if (response.error) {
      // console.log(response);
      console.log("MESSAGE: ", response.error.message);
      const errorMsg = response.error.message;
      dispatch(updateTaskFailure(errorMsg));
    } else {
      const data = response.data[0].task_id;
      console.log("this is the response payload", response.data)

      dispatch(updateTaskSuccess(data));
    }
  };
};