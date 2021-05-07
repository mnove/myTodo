import {

    CREATE_NEW_SUBTASK_REQUEST,
    CREATE_NEW_SUBTASK_SUCCESS,
    CREATE_NEW_SUBTASK_FAILURE,
    GET_A_SUBTASK_REQUEST,
    GET_A_SUBTASK_SUCCESS,
    GET_A_SUBTASK_FAILURE,
    DELETE_SUBTASK_REQUEST,
    DELETE_SUBTASK_SUCCESS,
    DELETE_SUBTASK_FAILURE,
    UPDATE_SUBTASK_REQUEST,
    UPDATE_SUBTASK_SUCCESS,
    UPDATE_SUBTASK_FAILURE
  } from "./tasksTypes";
  
  import { subtasksApi } from "../../api/subtasks-api";
  

  
  ///////////////////////////////
  // CREATE A NEW SUBTASK
  
  const createNewSubtaskRequest = () => {
    return {
      type: CREATE_NEW_SUBTASK_REQUEST,
    };
  };
  
  const createNewSubtaskSuccess = (data) => {
    return {
      type: CREATE_NEW_SUBTASK_SUCCESS,
      payload: data,
    };
  };
  
  const createNewSubtaskFailure = (error) => {
    return {
      type: CREATE_NEW_SUBTASK_FAILURE,
      payload: error,
    };
  };
  
  export const createNewSubtask = (taskId, newSubtaskDescription) => {
    return async (dispatch) => {
      console.log("reached here in the dispatch actions");
      dispatch(createNewSubtaskRequest());
  
      const response = await subtasksApi.createOne(taskId, newSubtaskDescription) ;
  
      if (response.error) {
        // console.log(response);
        console.log("MESSAGE: ", response.error.message);
        const errorMsg = response.error.message;
        dispatch(createNewSubtaskFailure(errorMsg));
      } else {
        const data = response.data[0];
        console.log("this is the response payload", response.data)
  
        dispatch(createNewSubtaskSuccess(data));
      }
    };
  };
  
  
  // GET A TASK BY ID 
  
    const getASubtaskRequest = () => {
      return {
        type: GET_A_SUBTASK_REQUEST,
      };
    };
  
    const getASubtaskSuccess = (data) => {
      return {
        type: GET_A_SUBTASK_SUCCESS,
        payload: data,
      };
    };
  
    const getASubtaskFailure = (error) => {
      return {
        type: GET_A_SUBTASK_FAILURE,
        payload: error,
      };
    };
  
    export const getASubtask = (subtaskId) => {
      return async (dispatch) => {
        console.log("reached here in the dispatch actions");
        dispatch(getASubtaskRequest());
  
        const response = await subtasksApi.getOne(subtaskId);
  
        if (response.error) {
          // console.log(response);
          console.log("MESSAGE: ", response.error.message);
          const errorMsg = response.error.message;
          dispatch(getASubtaskFailure(errorMsg));
        } else {
          const data = response.data[0];
          console.log("this is the response payload", response.data)
  
          dispatch(getASubtaskSuccess(data));
        }
      };
    };
  
  
  
    // DELETE A TASK BY ID
  
  const deleteSubtaskRequest = () => {
    return {
      type: DELETE_SUBTASK_REQUEST,
    };
  };
  
  const deleteSubtaskSuccess = (data) => {
    return {
      type: DELETE_SUBTASK_SUCCESS,
      payload: data,
    };
  };
  
  const deleteSubtaskFailure = (error) => {
    return {
      type: DELETE_SUBTASK_FAILURE,
      payload: error,
    };
  };
  
  export const deleteSubtask = (subtaskId) => {
    return async (dispatch) => {
      console.log("reached here in the dispatch actions");
      dispatch(deleteSubtaskRequest());
  
      const response = await subtasksApi.deleteOne(subtaskId);
  
      if (response.error) {
        // console.log(response);
        console.log("MESSAGE: ", response.error.message);
        const errorMsg = response.error.message;
        dispatch(deleteSubtaskFailure(errorMsg));
      } else {
        const data = response.data[0].subtask_id;
        console.log("this is the response payload", response.data)
  
        dispatch(deleteSubtaskSuccess(data));
      }
    };
  };
  
  // UPDATE A TASK BY ID
  
  const updateSubtaskRequest = () => {
    return {
      type: UPDATE_SUBTASK_REQUEST,
    };
  };
  
  const updateSubtaskSuccess = (newDescription, taskId) => {
    return {
      type: UPDATE_SUBTASK_SUCCESS,
      payload: {
        newDescription: newDescription,
        taskId: taskId
      },
    };
  };
  
  const updateSubtaskFailure = (error) => {
    return {
      type: UPDATE_SUBTASK_FAILURE,
      payload: error,
    };
  };
  
  export const updateSubtask = (subtaskId, newDescription) => {
    return async (dispatch) => {
      console.log("reached here in the dispatch actions");
      dispatch(updateSubtaskRequest());
  
      const response = await subtasksApi.updateOne(subtaskId, newDescription);
  
      if (response.error) {
         console.log(response);
        console.log("MESSAGE: ", response.error.message);
        const errorMsg = response.error.message;
        dispatch(updateSubtaskFailure(errorMsg));
      } else {
        const newDescription = response.data[0].subtask_description;
        const subtaskId = response.data[0].subtask_id;
        dispatch(updateSubtaskSuccess(newDescription, subtaskId));
        
      }
    };
  };