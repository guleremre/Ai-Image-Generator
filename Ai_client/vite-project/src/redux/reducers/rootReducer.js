import { combineReducers } from "redux";
import taskReducer from "./taskReducer/taskReducer";

const rootReducer = combineReducers({ tasks: taskReducer });

export default rootReducer;
