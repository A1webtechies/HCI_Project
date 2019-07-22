import { GET_ALL_PROPERTIES_OF_USER_CITY, PROPERTY_LOADING } from "./types";
import axios from "axios";

export const getPropertiesOfUserCity = () => dispatch => {
  dispatch(setPPropertyLoading());
  axios
    .get("/api/property/city")
    .then(res =>
      dispatch({
        type: GET_ALL_PROPERTIES_OF_USER_CITY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PROPERTIES_OF_USER_CITY,
        payload: {}
      })
    );
};

export const setPPropertyLoading = () => {
  return {
    type: PROPERTY_LOADING
  };
};
