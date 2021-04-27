import { 
  USER_LOADING,
  USER_LOADED, 
  AUTH_ERROR,
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL 
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {
  switch(action.type) {
      case USER_LOADING:
          return {
              ...state,
              isLoading: true
          };
      // Runs with every request to check if a user is logged in
      case USER_LOADED:
          return {
              ...state,
              isAuthenticated: true,
              isLoading: false,
              user: action.payload
          };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
      // Set token to local storage
      localStorage.setItem('token', action.payload.token);
          return {
              ...state,
              // Use the entire paylod user and token
              ...action.payload,
              isAuthenticated: true,
              isLoading: false
          };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
          localStorage.removeItem('token');
          return{
              ...state,
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false
          };
      default: return state;
  }
}