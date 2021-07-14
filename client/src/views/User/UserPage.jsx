import React from "react";
// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
// components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer, SuccessNotification} from "../../components/Notifications/Notifications";
// redux/api
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {updateUser} from "../../actions/userActions";


/**
 * Class Component for User settings
 */
class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName:         undefined,
            userEmail:        undefined,
            firstName:        undefined,
            lastName:         undefined,
            address:          undefined,
            city:             undefined,
            country:          undefined,
            zipCode:          undefined,
            mollieKey:        undefined,
            mollieCustomerId: undefined,
            role:             undefined,
        }
    }

    /**
     * Updates user
     */
    updateUser = async () => {
        const {role, ...body} = this.state;

        console.log(body);

        const updatedUser = await this.props.updateUser(this.props.authData.token, body);

        console.log(updatedUser);

        SuccessNotification(updatedUser.data.userEmail + " has been updated.");
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
        const {user} = this.props.userData;

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
                                            <h5 className="title">{user.userEmail}</h5>
                                        </a>
                                        <p className="description"></p>
                                    </div>
                                </CardBody>
                                <hr/>
                                <div className="button-container">
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="lg"
                                    >
                                        <i className="fab fa-facebook-f"/>
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="lg"
                                    >
                                        <i className="fab fa-twitter"/>
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="lg"
                                    >
                                        <i className="fab fa-google-plus-g"/>
                                    </Button>
                                </div>
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
                                                        defaultValue={user.userName}
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
                                                        defaultValue={user.userEmail}
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
                                                        defaultValue={user.firstName}
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
                                                        defaultValue={user.lastName}
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
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Adres</label>
                                                    <Input
                                                        name="address"
                                                        defaultValue={user.address}
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
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>Woonplaats</label>
                                                    <Input
                                                        name="city"
                                                        defaultValue={user.city}
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
                                                        defaultValue={user.country}
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
                                                        defaultValue={user.zipCode}
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
                                                    <label>Bankrekening (uitbetaling)</label>
                                                    <Input
                                                        name="mollieKey"
                                                        defaultValue={user.mollieKey}
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
    userData:   PropTypes.object.isRequired,
    authData:   PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData: state.userData,
    authData: state.authData,
});

export default connect(mapStateToProps, {updateUser})(User);
