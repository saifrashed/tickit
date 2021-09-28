import React from "react";
// reactstrap components
import {Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
// components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {ErrorNotification, NotificationContainer, SuccessNotification} from "../../components/Notifications/Notifications";
// redux/api
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getUser, updateUser} from "../../actions/userActions";


/**
 * Class Component for User settings
 */
class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName:  "",
            userEmail: "",
            firstName: "",
            lastName:  "",
            address:   "",
            city:      "",
            country:   "",
            zipCode:   "",
            IBAN:      "",
        }
    }

    /**
     * Initialise state
     */
    componentDidMount() {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getUser(token)])
               .then(([user]) => {
                   console.log(user);
                   this.setState({
                       userName:  user.data[0].userName,
                       userEmail: user.data[0].userEmail,
                       firstName: user.data[0].firstName,
                       lastName:  user.data[0].lastName,
                       address:   user.data[0].address,
                       city:      user.data[0].city,
                       country:   user.data[0].country,
                       zipCode:   user.data[0].zipCode,
                       IBAN:      user.data[0].IBAN
                   });

                   SuccessNotification("Uw gegevens zijn ingeladen")
               });
    }

    /**
     * Updates user
     */
    updateUser = async () => {
        const {...body} = this.state;

        if (!this.isValidIBANNumber(body.IBAN)) {
            return ErrorNotification("Iban niet correct");
        }

        const updatedUser = await this.props.updateUser(this.props.authData.token, body);

        SuccessNotification(updatedUser.data.userEmail + " is bijgewerkt.");
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

    /*
     * Returns 1 if the IBAN is valid
     * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
     * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
     */
    isValidIBANNumber = (input) => {
        var CODE_LENGTHS = {
            AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
            CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
            FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
            HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
            LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
            MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
            RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26,
            AL: 28, BY: 28, CR: 22, EG: 29, GE: 22, IQ: 23, LC: 32, SC: 31, ST: 25,
            SV: 28, TL: 23, UA: 29, VA: 22, VG: 24, XK: 20
        };
        var iban         = String(input).toUpperCase().replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
            code         = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
            digits;
        // check syntax and length
        if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
            return false;
        }
        // rearrange country code and check digits, and convert chars to ints
        digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
            return letter.charCodeAt(0) - 55;
        });
        // final check
        return this.mod97(digits);
    };

    mod97 = (string) => {
        var checksum = string.slice(0, 2), fragment;
        for (var offset = 2; offset < string.length; offset += 7) {
            fragment = String(checksum) + string.substring(offset, offset + 7);
            checksum = parseInt(fragment, 10) % 97;
        }
        return checksum;
    };

    render() {
        return (
            <>
                <PanelHeader size="sm"/>
                <NotificationContainer/>

                <div className="content">
                    <Row>
                        <Col md="4">
                            <Card className="card-user">
                                <div className="image"
                                     style={{background: "linear-gradient(160deg, #F96332 0%, #F37C2B 100%)"}}>
                                </div>
                                <CardBody>
                                    <div className="author">
                                        <a href="#" onClick={e => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="avatar border-gray"
                                                src={require("assets/img/user-male.png")}
                                            />
                                            <h5 className="title">{this.state.userEmail}</h5>
                                        </a>
                                        <p className="description"></p>
                                    </div>
                                </CardBody>
                                <hr/>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Profiel bewerken</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="3">
                                                <FormGroup>
                                                    <label>Gebruikersnaam</label>
                                                    <Input
                                                        name="userName"
                                                        defaultValue={this.state.userName}
                                                        placeholder="Gebruikersnaam"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>
                                                        Email adres
                                                    </label>
                                                    <Input
                                                        name="userEmail"
                                                        defaultValue={this.state.userEmail}
                                                        placeholder="Email" type="email"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="5">
                                                <FormGroup>
                                                    <label>Rol</label>
                                                    <Input
                                                        defaultValue="Organisator"
                                                        disabled
                                                        placeholder="Organisator"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label>Voornaam</label>
                                                    <Input
                                                        name="firstName"
                                                        defaultValue={this.state.firstName}
                                                        placeholder="Company"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label>Achternaam</label>
                                                    <Input
                                                        name="lastName"
                                                        defaultValue={this.state.lastName}
                                                        placeholder="Achternaam"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>Woonplaats</label>
                                                    <Input
                                                        name="city"
                                                        defaultValue={this.state.city}
                                                        placeholder="Woonplaats"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>Land</label>
                                                    <Input
                                                        name="country"
                                                        defaultValue={this.state.country}
                                                        placeholder="Land"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>Postcode</label>
                                                    <Input
                                                        name="zipCode"
                                                        defaultValue={this.state.zipCode}
                                                        placeholder="Postcode"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Adres</label>
                                                    <Input
                                                        name="address"
                                                        defaultValue={this.state.address}
                                                        placeholder="Adres"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Bankrekening (uitbetaling)</label>
                                                    <Input
                                                        name="IBAN"
                                                        defaultValue={this.state.IBAN}
                                                        placeholder="Rekeningnummer IBAN"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <button className="btn-round btn btn-success"
                                                style={{fontSize: "1.2em"}}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.updateUser();
                                                }}>
                                            Opslaan
                                        </button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

User.propTypes = {
    updateUser: PropTypes.func.isRequired,
    getUser:    PropTypes.func.isRequired,
    userData:   PropTypes.object.isRequired,
    authData:   PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData: state.userData,
    authData: state.authData,
});

export default connect(mapStateToProps, {updateUser, getUser})(User);
