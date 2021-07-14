import React, {Component} from "react";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "store";
import axios from "axios"

import Startup from "./Startup";
// Layouts
import AccountLayout from "layouts/Account.jsx";
import DashboardLayout from "layouts/Admin.jsx";
import ShopLayout from "layouts/Shop.jsx";

// includes
export const hist = createBrowserHistory();

/**
 * Main App
 */
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: undefined,
            user:  undefined
        }
    }

    componentWillMount() {
        this.checkLoggedIn();
    }

    /**
     * Check for token and verify
     *
     * @returns {Promise<void>}
     */
    checkLoggedIn = async () => {

        // storage token
        let token = localStorage.getItem("auth-token");

        // mail token
        const url         = new URL(window.location.href);
        const accessToken = url.searchParams.get("token");

        if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
        }

        // verify token
        const tokenRes = await axios.post("/users/verify", null, {headers: {"x-auth-token": token}});

        // get & set user data
        if (tokenRes.data) {
            const userRes = await axios.get("/users/", {headers: {"x-auth-token": token}});

            this.setState({
                token: token,
                user:  userRes.data
            })
        } else if (accessToken) {
            const userRes = await axios.get("/users/", {headers: {"x-auth-token": accessToken}});

            localStorage.setItem("auth-token", accessToken);

            this.setState({
                token: accessToken,
                user:  userRes.data
            })
        }
    };

    render() {
        return (
            <Provider store={store}>
                <Router history={hist}>
                    <Switch>
                        <Route path="/account" render={props => <AccountLayout {...props} />}/>
                        <Route path="/shop" render={props => <ShopLayout {...props} />}/>
                        <Redirect exact from={"/"} to={"/account"}/>
                    </Switch>
                </Router>

                <Startup token={this.state.token} user={this.state.user}>
                    <Router history={hist}>
                        <Switch>
                            <Route path="/admin" render={props => <DashboardLayout {...props} />}/>
                            <Redirect exact from={"/account/signin"} to={"/admin"}/>
                        </Switch>
                    </Router>
                </Startup>
            </Provider>
        );
    }
}

export default App;
