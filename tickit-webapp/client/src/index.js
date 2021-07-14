// Core
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
// Styling
import "bootstrap/dist/css/bootstrap.css";
import "assets/css/now-ui-dashboard.css";
import "assets/css/main.css";
import 'react-toastify/dist/ReactToastify.css';
// Layout
import App from "App";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , document.getElementById("root")
);
