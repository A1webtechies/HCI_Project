import {
  GET_WISHLIST,
  WISHLIST_LOADING,
  CLEAR_CURRENT_WISHLIST
} from "../actions/types";

const initialState = {
  wishlist: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_WISHLIST:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
