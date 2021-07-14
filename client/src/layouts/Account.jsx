import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
// components
import UserSignIn from "../views/User/UserSignIn.jsx";
import UserSignUp from "../views/User/UserSignUp.jsx";


class Account extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <Switch>
                    <Route exact path={"/account/signin"} component={UserSignIn}/>
                    <Route exact path={"/account/signup"} component={UserSignUp}/>
                    <Redirect exact from={"/account"} to={"/account/signin"}/>
                </Switch>
            </div>
        );
    }
}

export default Account;
