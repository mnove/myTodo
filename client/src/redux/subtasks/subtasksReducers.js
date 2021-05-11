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
  UPDATE_SUBTASK_FAILURE,
  GET_ALL_SUBTASKS_BY_TASK_ID_REQUEST,
  GET_ALL_SUBTASKS_BY_TASK_ID_SUCCESS,
  GET_ALL_SUBTASKS_BY_TASK_ID_FAILURE,
} from "./subtasksTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const subtasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_NEW_SUBTASK_SUCCESS:
      return {
        loading: false,
        data: [...state.data, action.payload],
        error: "",
      };

    case CREATE_NEW_SUBTASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case GET_A_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_A_SUBTASK_SUCCESS:
      return {
        loading: false,
        data: [...state.data, action.payload],
        error: "",
      };

    case GET_A_SUBTASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case DELETE_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SUBTASK_SUCCESS:
      return {
        loading: false,
        data: state.data.filter(
          (task, index) => task.task_id !== action.payload
        ),
        error: "",
      };

    case DELETE_SUBTASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case UPDATE_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SUBTASK_SUCCESS:
      // const { newDescription, taskId } = action.payload;

      return {
        loading: false,
        error: "",
        data: state.data.map((task) => {
          if (task.task_id === action.payload.taskId) {
            task.task_description = action.payload.newDescription;
          }

          return task;
        }),
      };

    case UPDATE_SUBTASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case GET_ALL_SUBTASKS_BY_TASK_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_SUBTASKS_BY_TASK_ID_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };

    case GET_ALL_SUBTASKS_BY_TASK_ID_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subtasksReducer;
