import axios from "axios";
import {ADD_TICKET_VARIANT, DELETE_TICKET_VARIANT, GET_TICKET_VARIANT, GET_TICKET_VARIANTS, LOADING_TICKET_VARIANT, TOGGLE_TICKET_VARIANT, UPDATE_TICKET_VARIANT} from "./types";

export const getTicketVariants = () => dispatch => {
    dispatch(setTicketVariantLoading());
    axios.get("/ticketvariants/").then(res =>
        dispatch({
            type:    GET_TICKET_VARIANTS,
            payload: res.data
        }))
};

export const getTicketVariant = (id) => dispatch => {
    dispatch(setTicketVariantLoading());
    axios.get("/ticketvariants/" + id).then(res =>
        dispatch({
            type:    GET_TICKET_VARIANT,
            payload: res.data[0]
        }))
};

export const addTicketVariant = (token, body) => async dispatch => {
    dispatch(setTicketVariantLoading());

    const newTicketVariant = await axios.post("/ticketvariants/add", body, {headers: {"x-auth-token": token}});

    dispatch({
        type:    ADD_TICKET_VARIANT,
        payload: newTicketVariant.data
    });

    return newTicketVariant;
};

export const updateTicketVariant = (token, id, body) => async dispatch => {
    dispatch(setTicketVariantLoading());

    const updatedTicketVariant = await axios.post("/ticketvariants/update/" + id, body, {headers: {"x-auth-token": token}});

    dispatch({
        type:    UPDATE_TICKET_VARIANT,
        payload: updatedTicketVariant.data
    });

    return updatedTicketVariant;
};

export const deleteTicketVariant = (token, id) => async dispatch => {
    dispatch(setTicketVariantLoading());
    const deletedTicketVariant = await axios.delete("/ticketvariants/" + id, {headers: {"x-auth-token": token}});

    dispatch({
        type:    DELETE_TICKET_VARIANT,
        payload: deletedTicketVariant.data[0]
    });

    return deletedTicketVariant
};

export const toggleTicketVariant = (token, id) => async dispatch => {
    dispatch(setTicketVariantLoading());
    const toggledTicketVariant = await axios.get("/ticketvariants/toggle/" + id, {headers: {"x-auth-token": token}});

    dispatch({
        type:    TOGGLE_TICKET_VARIANT,
        payload: toggledTicketVariant.data
    });

    return toggledTicketVariant
};

export const setTicketVariantLoading = () => {
    return {
        type: LOADING_TICKET_VARIANT
    }
};
