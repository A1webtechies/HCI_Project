import {
  GET_ALL_PROPERTIES_OF_USER_CITY,
  PROPERTY_LOADING
} from "../actions/types";
const initialState = {
  properties: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROPERTY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_PROPERTIES_OF_USER_CITY:
      return {
        ...state,
        properties: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
