
import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk"
import authReducer from "@/redux/Auth/Reducer.js";
import projectReducer from "@/redux/Project/Reducer.js";
import commentReducer from "@/redux/Comment/Reducer.js";
import chatReducer from "@/redux/Chat/Reducer.js";
import issueReducer from "@/redux/Issue/Reducer.js";
import subscriptionReducer from "@/redux/Subscription/Reducer.js";

const rootReducer=combineReducers({
    auth:authReducer,
    project:projectReducer,
    comment:commentReducer,
    chat:chatReducer,
    issue:issueReducer,
    subscription:subscriptionReducer
})


export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))