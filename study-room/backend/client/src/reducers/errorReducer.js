import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// Initial state object
const initialState = {
    // Message is a JSON object that comes from the server
    msg: {},
    status: null,
    id: null
}

export default function(state = initialState, action) {
    // Evaluate the action type
    switch(action.type) {
        case GET_ERRORS: 
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                // not all actions will have an id, we might want to target a specific error
                id: action.payload.id
            };
        // Set everything to default
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}