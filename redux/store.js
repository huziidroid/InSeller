import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
};
const persistReducerConfig = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
const store = createStore(
  persistReducerConfig,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export default store;
export { persistor };
