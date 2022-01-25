import {combineReducers} from "redux";
import { friendsAndWannabeesReducer } from "./friends-and-wannabees/slice.js";
import { messagesReducer } from "./chat/slice.js";
import { wallReducer } from "./wall/slice.js";



const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabeesReducer,
    messages: messagesReducer,
    wallMessages: wallReducer,
});

export default rootReducer;