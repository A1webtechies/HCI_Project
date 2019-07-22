import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import wishlistReducer from "./wishlistReducer";
import propertyReducer from "./propertyReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  wishlist: wishlistReducer,
  properties: propertyReducer
});
