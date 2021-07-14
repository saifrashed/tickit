import React from "react";
// reactstrap components
import {Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";
// reactstrap
import {connect} from "react-redux";
import {addEvent} from "../../actions/eventActions";
import PropTypes from "prop-types";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer} from "../../components/Notifications/Notifications";


class EventAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventName:     "",
            eventStart:    "",
            eventEnd:      "",
            eventLocation: "",
            eventAge:      "",
            user:          "",
        }
    }

    /**
     * Creates Event
     */
    addEvent = async () => {
        const {...body} = this.state;
        const newEvent  = await this.props.addEvent(this.props.authData.token, body);

        window.location.href = "../event/" + newEvent.data._id;
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
            <>
                <PanelHeader size="sm"/>
                <NotificationContainer/>

                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Evenement creëren</h5>
                                    <p className="category"> Maak evenement aan. Houdt rekening met dat de ingevulde
                                                             informatie weergegeven zal worden op de shop pagina.</p>
                                </CardHeader>

                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Evenement naam</label>
                                                    <Input
                                                        name="eventName"
                                                        placeholder="Evenement naam"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>
                                                        Evenement start
                                                    </label>
                                                    <Input
                                                        name="eventStart"
                                                        placeholder="Evenement start"
                                                        type="datetime-local"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Evenement eind</label>
                                                    <Input
                                                        name="eventEnd"
                                                        placeholder="Evenement eind"
                                                        type="datetime-local"
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
                                                    <label>Locatie</label>
                                                    <Input
                                                        name="eventLocation"
                                                        placeholder="Locatie"
                                                        type="text"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Minimum leeftijd</label>
                                                    <Input
                                                        name="eventAge"
                                                        placeholder="Minimum leeftijd"
                                                        type="number"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <button className="btn-round btn btn-success"
                                                style={{fontSize: "1em", position: "relative", width: "100px"}}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.addEvent();
                                                }}>
                                            Create
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

EventAdd.propTypes = {
    addEvent:  PropTypes.func.isRequired,
    userData:  PropTypes.object.isRequired,
    authData:  PropTypes.object.isRequired,
    eventData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    authData:  state.authData,
    eventData: state.eventData,
});

export default connect(mapStateToProps, {addEvent})(EventAdd);
