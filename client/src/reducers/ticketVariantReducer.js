import {ADD_TICKET_VARIANT, DELETE_TICKET_VARIANT, GET_TICKET_VARIANT, GET_TICKET_VARIANTS, LOADING_TICKET_VARIANT, TOGGLE_TICKET_VARIANT, UPDATE_TICKET_VARIANT} from "../actions/types";

const initialState = {
    ticketVariants: {},
    loading:        false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TICKET_VARIANTS:
            return {
                ...state,
                ticketVariants: action.payload,
                loading:        false
            };
        case GET_TICKET_VARIANT:
            return {
                ...state,
                ticketVariants: action.payload,
                loading:        false
            };
        case ADD_TICKET_VARIANT:
            return {
                ticketVariants: action.payload,
                loading:        false
            };
        case UPDATE_TICKET_VARIANT:
            return {
                ...state,
                loading: false
            };
        case DELETE_TICKET_VARIANT:
            return {
                ...state,
                loading: false
            };
        case TOGGLE_TICKET_VARIANT:
            return {
                ...state,
                loading: false
            };
        case LOADING_TICKET_VARIANT:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
