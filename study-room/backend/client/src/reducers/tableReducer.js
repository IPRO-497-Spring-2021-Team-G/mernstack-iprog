import { GET_TABLES, ADD_TABLE, DELETE_TABLE, TABLES_LOADING } from '../actions/types';

// Lesson 7
const initialState = {
    tables: [],
    loading: false
};

// action is an object that will have a type attached to it
export default function(state = initialState, action) {
    // Test action type
    switch(action.type) {
        case GET_TABLES:
            return {
                // Make a copy of the current state
                ...state,
                // add data
                tables: action.payload,
                loading: false
                // a spinner can be added here
            };
        case ADD_TABLE:
            return {
                ...state,
                // making a copy of the state, instead of mutating it
                tables: [action.payload, ...state.tables]
            };
        case DELETE_TABLE:
            return {
                ...state,
                // Filter out the deleted item, so it is not returned in an array
                tables: state.tables.filter(table => table._id !== action.payload)
            };
        case TABLES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}