import { GET_DATA, DELETE_USER, EDIT_USER } from "../../consts";

const users = (state = [], action) => {
  switch (action.type) {
    case GET_DATA:
      return (state = [...state, ...action.payload]);
    case DELETE_USER:
      return (state = state.filter(user => user.id != action.payload));
    case EDIT_USER:
      return Object.assign([...state], {
        [action.index]: Object.assign({}, state[action.index], {
          first_name: action.firstName,
          last_name: action.lastName
        })
      });

    // (state = Object.assign([...state], {
    //   [action.index]: Object.assign(
    //     { ...state[action.index] },
    //     {
    //       first_name: action.firstName,
    //       last_name: action.lastName
    //     }
    //   )
    // }));

    default:
      return state;
  }
};

export default users;
