import { combineReducers } from "redux";
import StoreCategoryReducer from "./StoreCategory/reducer";
import userReducer from "./User/user.reducer";
import itemReducer from "./Items/item.reducer";
import categoryReducer from "./Categories/category.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  store_categories: StoreCategoryReducer,
  items: itemReducer,
  categories: categoryReducer,
});
export default rootReducer;
