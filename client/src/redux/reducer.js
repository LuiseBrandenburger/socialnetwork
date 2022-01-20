import {combineReducers} from "redux";
import {friendsAndWannabees} from "./friends-and-wannabees/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsAndWannabees,
});

export default rootReducer;