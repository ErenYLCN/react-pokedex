import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import collectionReducer from "./collectionReducer"

const reducers = combineReducers({
    theme: themeReducer,
    collection: collectionReducer,
});

export default reducers;