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
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
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
        data: [...state.data, action.payload], // original order>>>>  [action.payload, ...state.data ]
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
        data: state.data.filter(
          (task, index) => task.task_id !== action.payload
        ),
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

    case UPDATE_TASK_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    case UPDATE_TASK_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TASK_STATUS_SUCCESS:
      // const { newDescription, taskId } = action.payload;


      return {
        loading: false,
        error: "",
        data: state.data.map((task) => {
          if (task.task_id === action.payload.taskId) {
            return {
              ...task,
              task_is_completed: action.payload.newStatus,
            };
          }

          return task;
        }),
      };

    case UPDATE_TASK_STATUS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tasksReducer;
