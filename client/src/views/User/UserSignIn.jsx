import React from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginAuth} from "../../actions/authActions";

import {NotificationContainer, SuccessNotification, WarningNotification} from "../../components/Notifications/Notifications";

/**
 * Component used to sign a user in.
 */
class UserSignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userEmail:    '',
            userPassword: '',
        };
    }

    /**
     * Checks user data and sent authentication mail.
     *
     * @returns {Promise<void>}
     */
    loginUser = async () => {
        const userLogin = await this.props.loginAuth(this.state);

        console.log(userLogin);

        if (userLogin.status) {
            this.setState({
                userEmail:    '',
                userPassword: '',
            });

            SuccessNotification("U wordt ingelogt...");
        } else {
            WarningNotification(userLogin.msg)
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
                                                <h3 className="login-heading mb-4">Welkom Terug!</h3>
                                                <p>
                                                    Een geavanceerd ticketsysteem dat de nieuwste app / web technologie
                                                    gebruikt
                                                    om uw ticketing ervaring goedkoop en moeiteloos te maken.
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

                                                <div className="row no-gutter">
                                                    <div className="col-md-5">
                                                        <a
                                                            href="#"
                                                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                            onClick={this.loginUser}
                                                        >
                                                            Inloggen
                                                        </a>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <div className="text-center" style={{padding: "1.25rem 0"}}>
                                                            Of

                                                        </div>
                                                    </div>

                                                    <div className="col-md-5">
                                                        <a
                                                            href={"./signup"}
                                                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                        >Registreren
                                                        </a>
                                                    </div>
                                                </div>


                                                <div className="text-center">
                                                    <a className="small" href="#">Wachtwoord vergeten?</a></div>
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

UserSignIn.propTypes = {
    loginAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userData: state.userData,
    authData: state.authData,
});

export default connect(mapStateToProps, {loginAuth})(UserSignIn);
