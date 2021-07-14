import {ADD_ORDER, DELETE_ORDER, GET_ORDER, GET_ORDERS, GET_PAYMENT_URL, LOADING_ORDER, UPDATE_ORDER} from "../actions/types";

const initialState = {
    order:   {},
    orders:  [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PAYMENT_URL:
            return {
                ...state,
                loading: false
            };
        case GET_ORDER:
            return {
                ...state,
                order:   action.payload,
                loading: false
            };
        case GET_ORDERS:
            return {
                ...state,
                orders:  action.payload,
                loading: false
            };

        case ADD_ORDER:
            return {
                order:   action.payload,
                loading: false
            };
        case UPDATE_ORDER:
            return {
                ...state,
                loading: false
            };
        case DELETE_ORDER:
            return {
                ...state,
                loading: false
            };
        case LOADING_ORDER:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
