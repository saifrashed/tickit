import React from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUser, updateUser} from "./actions/userActions";
import {verifyAuth} from "./actions/authActions";

/**
 * Class Initialise component
 */
class Startup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token && prevProps.user !== this.props.user) {
            Promise.all([this.verifyUser(this.props.token), this.getUser(this.props.token)])
                   .then(([verifiedUser, userData]) => {
                       this.setState({loaded: true});
                       console.log("logged in!")
                   });
        }
    }

    /**
     * Verifies user
     *
     * @param token
     * @returns {Promise<void>}
     */
    verifyUser = async (token) => {
        const verified = await this.props.verifyAuth(token);
    };

    /**
     * Sets user data
     *
     * @param token
     * @returns {Promise<void>}
     */
    getUser = async (token) => {
        const user = await this.props.getUser(token);
    };

    render() {
        return (
            this.state.loaded
            ? this.props.children
            : (null)
        );
    }
}

Startup.propTypes = {
    verifyAuth: PropTypes.func.isRequired,
    getUser:    PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    userData:   PropTypes.object.isRequired,
    authData:   PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData: state.userData,
    authData: state.authData,
});

export default connect(mapStateToProps, {getUser, updateUser, verifyAuth})(Startup);
