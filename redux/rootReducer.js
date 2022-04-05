import { combineReducers } from "redux";
import categoryReducer from "./StoreCategory/reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  store_categories: categoryReducer,
});
export default rootReducer;
