import {
  WISHLIST_LOADING,
  GET_WISHLIST,
  GET_ERRORS,
  CLEAR_CURRENT_WISHLIST
} from "./types";
import axios from "axios";

// Get Current Wishlist
export const getCurrentWishlist = () => dispatch => {
  dispatch(setWihlistLoading());
  axios
    .get("/api/wishlist")
    .then(res =>
      dispatch({
        type: GET_WISHLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WISHLIST,
        payload: {}
      })
    );
};

// Create Wishlist
export const createWishlist = (wishlistData, history) => dispatch => {
  axios
    .post("/api/wishlist", wishlistData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Loading
export const setWihlistLoading = () => {
  return {
    type: WISHLIST_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_WISHLIST
  };
};
