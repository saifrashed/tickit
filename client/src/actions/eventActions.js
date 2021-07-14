import axios from "axios";
import {ADD_EVENT, DELETE_EVENT, GET_EVENT, LOADING_EVENT, UPDATE_EVENT, UPLOAD_IMAGE_EVENT} from "./types";

export const getEvent = (id) => async dispatch => {
    dispatch(setEventLoading());
    const event = await axios.get("/events/" + id);

    dispatch({
        type:    GET_EVENT,
        payload: event.data[0]
    });

    return event;
};

export const updateEvent = (token, id, body) => async dispatch => {
    dispatch(setEventLoading());
    const updatedEvent = await axios.post("/events/update/" + id, body, {headers: {"x-auth-token": token}});

    dispatch({
        type:    UPDATE_EVENT,
        payload: updatedEvent.data
    });

    return updatedEvent
};

export const addEvent = (token, body) => async dispatch => {
    dispatch(setEventLoading());
    const newEvent = await axios.post("/events/add", body, {headers: {"x-auth-token": token}});

    dispatch({
        type:    ADD_EVENT,
        payload: newEvent.data
    });

    return newEvent
};

export const deleteEvent = (token, id) => async dispatch => {
    dispatch(setEventLoading());
    const deletedEvent = await axios.delete("/events/" + id, {headers: {"x-auth-token": token}});

    dispatch({
        type:    DELETE_EVENT,
        payload: deletedEvent.data[0]
    });

    return deletedEvent
};

export const uploadImageEvent = (token, id, body) => async dispatch => {
    dispatch(setEventLoading());
    const uploadImageEvent = await axios.post("/events/upload?eventId=" + id, body, {headers: {"x-auth-token": token}});

    dispatch({
        type: UPLOAD_IMAGE_EVENT,
    });

    return uploadImageEvent
};

export const setEventLoading = () => {
    return {
        type: LOADING_EVENT
    }
};
