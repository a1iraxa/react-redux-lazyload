import counterReducer from "./counter";
import loggedReducer from "./logged";
import postReducer from "./post";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    postReducer: postReducer,
});

export default allReducers;
