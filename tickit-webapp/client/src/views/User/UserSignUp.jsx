import React from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerAuth} from "../../actions/authActions";

import {NotificationContainer, SuccessNotification, WarningNotification} from "../../components/Notifications/Notifications";

/**
 * Component used to sign a user up.
 */
class UserSignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userEmail:    '',
            userPassword: '',
            firstName:    '',
            lastName:     ''
        };
    }

    /**
     * Registers user
     *
     * @returns {Promise<void>}
     */
    registerUser = async () => {
        const userRegister = await this.props.registerAuth(this.state);

        if (userRegister.status) {
            this.setState({
                userEmail:    '',
                userPassword: '',
                firstName:    '',
                lastName:     ''
            });

            SuccessNotification("Account created! Sign in to continue.");
        } else {
            WarningNotification(userRegister.msg)
        }
    };

    /**
     * Handles input changes
     * @param e
     */
    handleChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    render() {
        return (
            <div className="auth">
                <NotificationContainer/>
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6">
                            <div className="login d-flex align-items-center py-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <div className="text-center">
                                                <img src={require("../../assets/img/tickit_logo.png")}
                                                     style={{width: "300px", marginBottom: "50px"}}/>
                                                <h3 className="login-heading mb-4">Goedkoop en simpel ticket verkoop
                                                                                   voor u!</h3>
                                                <p>
                                                    Een geavanceerd ticketsysteem dat de nieuwste app / web technologie
                                                    gebruikt
                                                    om uw ticketing ervaring goedkoop en moeiteloos te maken. Registreer
                                                    nu en kijk
                                                    waarom.
                                                </p>
                                            </div>

                                            <br/>
                                            <form>
                                                <div className="form-label-group">
                                                    <input
                                                        name="userEmail"
                                                        type="email"
                                                        id="inputEmail"
                                                        className="form-control"
                                                        placeholder="Email adres"
                                                        required autoFocus
                                                        value={this.state.userEmail}
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}/>
                                                </div>

                                                <div className="form-label-group">
                                                    <input
                                                        name="userPassword"
                                                        type="password"
                                                        id="inputPassword"
                                                        className="form-control"
                                                        placeholder="Wachtwoord"
                                                        required autoFocus
                                                        value={this.state.userPassword}
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}/>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-label-group">
                                                            <input
                                                                name="firstName"
                                                                type="text"
                                                                id="inputFirstName"
                                                                className="form-control"
                                                                placeholder="Voornaam"
                                                                required autoFocus
                                                                value={this.state.firstName}
                                                                onChange={(e) => {
                                                                    this.handleChange(e)
                                                                }}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-label-group">
                                                            <input
                                                                name="lastName"
                                                                type="text"
                                                                id="inputLastName"
                                                                className="form-control"
                                                                placeholder="Achternaam"
                                                                required autoFocus
                                                                value={this.state.lastName}
                                                                onChange={(e) => {
                                                                    this.handleChange(e)
                                                                }}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row no-gutter">
                                                    <div className="col-md-5">
                                                        <a
                                                            href="#"
                                                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                            type="submit"
                                                            onClick={this.registerUser}
                                                        >
                                                            Registreer
                                                        </a>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <div className="text-center" style={{padding: "1.25rem 0"}}>
                                                            Of
                                                        </div>
                                                    </div>

                                                    <div className="col-md-5">
                                                        <a
                                                            href={"./signin"}
                                                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                            type="submit">
                                                            Inloggen
                                                        </a>
                                                    </div>
                                                </div>


                                                <div className="text-center">
                                                    <a className="small" href="#">Terug naar de site</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserSignUp.propTypes = {
    registerAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userData: state.userData,
    authData: state.authData,
});

export default connect(mapStateToProps, {registerAuth})(UserSignUp);
