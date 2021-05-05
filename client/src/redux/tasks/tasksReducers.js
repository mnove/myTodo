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

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_TASKS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };

    case GET_ALL_TASKS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case CREATE_NEW_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_NEW_TASK_SUCCESS:
      return {
        loading: false,
        data: [...state.data, action.payload],
        error: "",
      };

    case CREATE_NEW_TASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    // case GET_A_TASK_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case GET_A_TASK_SUCCESS:
    //   return {
    //     loading: false,
    //     data: [...state.data, action.payload],
    //     error: "",
    //   };

    // case GET_A_TASK_FAILURE:
    //   return {
    //     loading: false,
    //     data: [],
    //     error: action.payload,
    //   };

    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TASK_SUCCESS:
      return {
        loading: false,
        data: state.data.filter((task, index) => task.task_id !== action.payload),
        error: "",
      };

    case DELETE_TASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

      case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TASK_SUCCESS:
      return {
        loading: false,
        data: state.data.filter((task, index) => task.task_id !== action.payload),
        error: "",
      };

    case UPDATE_TASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,UPDATE
      }
    default:
      return state;
  }
};

export default tasksReducer;
