// Root reducer brings together all other reducers (auth reducer, error reducer)
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

// Pass an object with all reducers
export default combineReducers({
    error: errorReducer,
    auth: authReducer
});