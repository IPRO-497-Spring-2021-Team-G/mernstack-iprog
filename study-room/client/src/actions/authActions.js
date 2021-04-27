import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL 
} from "./types";

// Check token & load user
// Call dispatch for asyc request
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/admins', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            // res.data is an object with a token and a user oject
            payload: res.data
        }))
        .catch(err => {
            // Retuen object with msg, status, id
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                // run any errors through errorReducer
                type: AUTH_ERROR
            });
        });
};

// Register User
// de-structure
export const register = ({ name, email, password }) => dispatch => {
    // Add header value of content type
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    // Request body
    // Take JavaScript object and pass it to JSON
    const body = JSON.stringify({ name, email, password });

    axios.post('api/admins', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

// Login User
export const login = ({ email, password }) => dispatch => {
    // Add header value of content type
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    // Request body
    // Take JavaScript object and pass it to JSON
    const body = JSON.stringify({ email, password });

    axios.post('api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Helper function: set up config/headers and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;

    // Add token to headers by setting an object
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Check the token: if token, then add to headers
    if (token) {
        // Set x-auth-token to token from local storage
        config.headers['x-auth-token'] =  token;
    }

    return config;
}