import {ADD_ORDER, DELETE_ORDER, GET_ORDER, GET_ORDERS, RESEND_ORDER, GET_PAYMENT_URL, LOADING_ORDER, ORDER_REPORT_DAILY, ORDER_REPORT_MONTHLY, ORDER_REPORT_YEARLY, UPDATE_ORDER, SEND_TO_RECIPIENT} from "../actions/types";

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
        case RESEND_ORDER:
            return {
                ...state,
                loading: false
            };
        case SEND_TO_RECIPIENT:
            return {
                ...state,
                loading: false
            };
        case ORDER_REPORT_DAILY:
            return {
                order:   action.payload,
                loading: false
            };
        case ORDER_REPORT_MONTHLY:
            return {
                order:   action.payload,
                loading: false
            };
        case ORDER_REPORT_YEARLY:
            return {
                order:   action.payload,
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
