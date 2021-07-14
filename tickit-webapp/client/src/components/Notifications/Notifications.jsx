/**
 * Notifcation components
 */


import React from "react";
import {toast, ToastContainer} from 'react-toastify';


export const NotificationContainer = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
        />
    );
};

export const DefaultNotification = (message) => {
    toast.info(message, {
        position:        "top-right",
        autoClose:       5000,
        hideProgressBar: false,
        closeOnClick:    true,
        pauseOnHover:    false,
        draggable:       true,
    });
};

export const SuccessNotification = (message) => {
    toast.success(message, {
        position:        "top-right",
        autoClose:       5000,
        hideProgressBar: false,
        closeOnClick:    true,
        pauseOnHover:    false,
        draggable:       true,
    });
};

export const WarningNotification = (message) => {
    toast.warn(message, {
        position:        "top-right",
        autoClose:       5000,
        hideProgressBar: false,
        closeOnClick:    true,
        pauseOnHover:    false,
        draggable:       true,
    });
};

export const ErrorNotification = (message) => {
    toast.error(message, {
        position:        "top-right",
        autoClose:       5000,
        hideProgressBar: false,
        closeOnClick:    true,
        pauseOnHover:    false,
        draggable:       true,
    });
};
