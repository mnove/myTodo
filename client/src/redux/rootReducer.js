import { combineReducers } from "redux";

import authReducer from "./auth/authReducers";
import tasksReducer from "./tasks/tasksReducers";
import subtasksReducer from "./subtasks//subtasksReducers";


const rootReducer = combineReducers({
    
    auth: authReducer,
    tasks: tasksReducer,
    subtask: subtasksReducer


});

export default rootReducer;