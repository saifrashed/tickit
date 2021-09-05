import React, {Component} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutAuth} from "../../actions/authActions";
// QR code generator
import {QRCode} from "react-qr-svg";


class FixedPlugin extends Component {
    constructor(props) {
        super(props);
        this.state       = {
            classes: "dropdown"
        };
        this.handleClick = this.handleClick.bind(this);
    }


    /**
     * Handles dropdown
     */
    handleClick() {
        if (this.state.classes === "dropdown") {
            this.setState({classes: "dropdown show"});
        } else {
            this.setState({classes: "dropdown"});
        }
    }

    render() {
        return (
            <div className="fixed-plugin">
                <div className={this.state.classes}>
                    <div onClick={this.handleClick}>
                        <i className="fa fa-cog fa-2x"/>
                    </div>
                    <ul className="dropdown-menu show">
                        <li className="header-title">Acties</li>

                        <li className="button-container">
                            <a
                                onClick={this.props.logoutAuth}
                                href={"/account/signin"}
                                className="btn btn-primary btn-block btn-round"
                            >
                                Uitloggen
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                className="btn btn-warning btn-block btn-round"
                            >
                                Download Android app
                            </a>
                            <a
                                href="https://www.creative-tim.com/product/now-ui-dashboard-react?ref=nudr-fixed-plugin"
                                target="_blank"
                                className="btn btn-warning btn-block btn-round disabled"
                            >
                                Download IOS app
                            </a>
                            <a
                                href="https://www.vorm.tech/applicaties/tickit"
                                className="btn btn-block btn-round btn-info"
                            >
                                Contact
                            </a>

                            <p>Scan de QR code in de TickIT app om toegang te krijgen (Deel deze QR code met
                               niemand).</p>

                            <QRCode
                                value={this.props.authData.token}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

FixedPlugin.propTypes = {
    logoutAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userData: state.userData,
    authData: state.authData,
});


export default connect(mapStateToProps, {logoutAuth})(FixedPlugin);
