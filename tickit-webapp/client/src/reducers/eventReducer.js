import {ADD_EVENT, DELETE_EVENT, GET_ACTIVE_EVENTS, GET_EVENT, GET_EVENTS, GET_INACTIVE_EVENTS, LOADING_EVENT, UPDATE_EVENT, UPLOAD_IMAGE_EVENT} from "../actions/types";

const initialState = {
    event:   {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                event:   action.payload,
                loading: false
            };
        case GET_ACTIVE_EVENTS:
            return {
                ...state,
                event:   action.payload,
                loading: false
            };
        case GET_INACTIVE_EVENTS:
            return {
                ...state,
                event:   action.payload,
                loading: false
            };
        case GET_EVENT:
            return {
                ...state,
                event:   action.payload,
                loading: false
            };
        case ADD_EVENT:
            return {
                event:   action.payload,
                loading: false
            };
        case UPDATE_EVENT:
            return {
                ...state,
                loading: false
            };
        case DELETE_EVENT:
            return {
                ...state,
                loading: false
            };
        case UPLOAD_IMAGE_EVENT:
            return {
                ...state,
                loading: false
            };
        case LOADING_EVENT:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
