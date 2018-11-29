import { GET_DATA, DELETE_USER, EDIT_USER } from "../store/constants";
import axios from "axios";

const API_URL = "https://reqres.in/api/users";

export const getData = page => {
  return dispatch => {
    axios.get(`${API_URL}?per_page=12`).then(response => {
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
    axios.delete(`${API_URL}/${id}`).then(res => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    });
  };
};

export const editUser = obj => {
  return dispatch => {
    axios.put(`${API_URL}/${obj.id}`, obj).then(res => {
      dispatch({
        type: EDIT_USER,
        ...obj
        // index: obj.index,
        // id: obj.id,
        // firstName: obj.firstName,
        // lastName: obj.lastName,
        // avatar: obj.avatar
      });
    });
    // console.log(obj);
  };
};
