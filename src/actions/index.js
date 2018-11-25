import { GET_DATA, DELETE_USER, EDIT_USER } from "../consts";
import axios from "axios";

export const getData = page => {
  return dispatch => {
    axios.get(`https://reqres.in/api/users?page=${page}`).then(response => {
      dispatch({
        type: GET_DATA,
        payload: response.data.data
      });
    });
  };
};

export const deleteUser = id => {
  return dispatch => {
    console.log("del");
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  };
};

export const editUser = obj => {
  return dispatch => {
    dispatch({
      type: EDIT_USER,
      index: obj.index,
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      avatar: obj.avatar
    });
  };
};
