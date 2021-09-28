import axios from "axios";
import {saveAs} from "file-saver"
import {ADD_ORDER, DELETE_ORDER, GET_ORDER, GET_ORDERS, GET_PAYMENT_URL, LOADING_ORDER, ORDER_REPORT_DAILY, ORDER_REPORT_MONTHLY, ORDER_REPORT_YEARLY, RESEND_ORDER, UPDATE_ORDER} from "./types";

export const getOrder = (token, id) => async dispatch => {
    dispatch(setOrderLoading());
    const orders = await axios.get("/orders/" + id);


    if (token) {
        const payment              = await axios.get("/orders/payments/" + orders.data.paymentId, {headers: {"x-auth-token": token}});
        orders.data.paymentDetails = payment.data;
    }

    dispatch({
        type:    GET_ORDER,
        payload: orders.data
    });

    return orders;
};

export const getOrders = (token) => async dispatch => {
    dispatch(setOrderLoading());
    const orders = await axios.get("/orders/user/", {headers: {"x-auth-token": token}});

    dispatch({
        type:    GET_ORDERS,
        payload: orders.data
    });

    return orders;
};

export const updateOrder = (id, body) => async dispatch => {
    dispatch(setOrderLoading());
    const updatedOrder = await axios.post("/orders/update/" + id, body);

    dispatch({
        type:    UPDATE_ORDER,
        payload: updatedOrder.data
    });

    return updatedOrder
};

export const addOrder = (body) => async dispatch => {
    dispatch(setOrderLoading());
    const newOrder = await axios.post("/orders/add", body);

    dispatch({
        type:    ADD_ORDER,
        payload: newOrder.data
    });

    return newOrder
};

export const deleteOrder = (token, id) => async dispatch => {
    dispatch(setOrderLoading());
    const deletedOrder = await axios.delete("/orders/" + id, {headers: {"x-auth-token": token}});

    dispatch({
        type:    DELETE_ORDER,
        payload: deletedOrder.data[0]
    });

    return deletedOrder
};

export const resendOrder = (body) => async dispatch => {
    dispatch(setOrderLoading());
    const resendOrder = await axios.post("/orders/webhook", body);

    dispatch({
        type:    RESEND_ORDER,
        payload: resendOrder.data
    });

    return resendOrder
};

export const toPayment = (id) => async dispatch => {
    dispatch(setOrderLoading());
    const paymentUrl = await axios.get("/orders/checkout/" + id);

    dispatch({
        type: GET_PAYMENT_URL,
    });

    return paymentUrl
};

export const getDailyOrderReport = (token) => async dispatch => {
    dispatch(setOrderLoading());
    const report = await axios.get("/orders/report/daily", {headers: {"x-auth-token": token}});

    dispatch({
        type:    ORDER_REPORT_DAILY,
        payload: report.data
    });

    return report;
};

export const getMonthlyOrderReport = (token) => async dispatch => {
    dispatch(setOrderLoading());
    const report = await axios.get("/orders/report/monthly", {headers: {"x-auth-token": token}});

    dispatch({
        type:    ORDER_REPORT_MONTHLY,
        payload: report.data
    });

    return report;
};

export const getYearlyOrderReport = (token) => async dispatch => {
    dispatch(setOrderLoading());
    const report = await axios.get("/orders/report/yearly", {headers: {"x-auth-token": token}});

    dispatch({
        type:    ORDER_REPORT_YEARLY,
        payload: report.data
    });

    return report;
};


export const setOrderLoading = () => {
    return {
        type: LOADING_ORDER
    }
};
