import {combineReducers} from "redux";
import { friendsAndWannabeesReducer } from "./friends-and-wannabees/slice.js";
// import { friendsAndWannabeesReducer } from "./redux/friends-and-wannabees/slice.js";


const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabeesReducer,
});

export default rootReducer;