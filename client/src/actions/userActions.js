import {DELETE_USER, GET_USER, LOADING_USER, UPDATE_USER} from "./types";
import axios from "axios";

export const getUser = (token) => async dispatch => {
    dispatch(setUserLoading());
    const user = await axios.get("/users/", {headers: {"x-auth-token": token}});

    dispatch({
        type:    GET_USER,
        payload: user.data[0]
    });

    return user;
};

export const updateUser = (token, body) => async dispatch => {
    dispatch(setUserLoading());
    const updatedUser = await axios.post("/users/update/", body, {headers: {"x-auth-token": token}});

    dispatch({
        type:    UPDATE_USER,
        payload: updatedUser.data
    });

    return updatedUser
};

export const deleteUser = (id) => dispatch => {
    dispatch(setUserLoading());
    axios.delete("/users/" + id).then(res =>
        dispatch({
            type:    DELETE_USER,
            payload: res.data[0]
        }))
};

export const setUserLoading = () => {
    return {
        type: LOADING_USER
    }
};
