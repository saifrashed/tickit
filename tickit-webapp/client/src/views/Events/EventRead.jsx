import React from "react";
import moment from 'moment';
import PropTypes from "prop-types";
// reactstrap components
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {getEvent, updateEvent, uploadImageEvent} from "../../actions/eventActions";
import {toggleTicketVariant} from "../../actions/ticketVariantActions";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer, SuccessNotification, WarningNotification} from "../../components/Notifications/Notifications";

/**
 * Reads a event
 */
class EventRead extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            _id:            "",
            eventName:      "",
            eventStart:     "",
            eventEnd:       "",
            eventLocation:  "",
            eventAge:       "",
            ticketVariants: "",
            user:           "",
        }
    }


    /**
     * Initialise state
     */
    componentDidMount() {
        Promise.all([this.props.getEvent(this.props.match.params.id)])
               .then(([event]) => {
                   this.setState({
                       _id:            event.data[0]._id,
                       eventName:      event.data[0].eventName,
                       eventStart:     moment(event.data[0].eventStart, moment.ISO_8601).format("YYYY-MM-DDTHH:mm"),
                       eventEnd:       moment(event.data[0].eventEnd, moment.ISO_8601).format("YYYY-MM-DDTHH:mm"),
                       eventLocation:  event.data[0].eventLocation,
                       eventAge:       event.data[0].eventAge,
                       ticketVariants: event.data[0].ticketVariants,
                       user:           event.data[0].user
                   });

                   if (event.data[0].ticketVariants.length) {
                       SuccessNotification("Bekijk de shop online!");
                   } else {
                       WarningNotification("Voeg ticket varianten toe.");
                   }
               });
    }

    /**
     * Refresh component state
     */
    refresh = async () => {
        Promise.all([this.props.getEvent(this.props.match.params.id)])
               .then(([event]) => {
                   this.setState({
                       _id:            event.data[0]._id,
                       eventName:      event.data[0].eventName,
                       eventStart:     moment(event.data[0].eventStart, moment.ISO_8601).format("YYYY-MM-DDTHH:mm"),
                       eventEnd:       moment(event.data[0].eventEnd, moment.ISO_8601).format("YYYY-MM-DDTHH:mm"),
                       eventLocation:  event.data[0].eventLocation,
                       eventAge:       event.data[0].eventAge,
                       ticketVariants: event.data[0].ticketVariants,
                       user:           event.data[0].user
                   });

                   SuccessNotification("Bijgewerkt!");
               });
    };


    /**
     * Deletes Event
     */
    toggleTicketVariant = async (id) => {

        const toggledTicketVariant = await this.props.toggleTicketVariant(this.props.authData.token, id);
        const event                = await this.props.getEvent(this.props.match.params.id);

        SuccessNotification(toggledTicketVariant.data.description + (toggledTicketVariant.data.availability ? " is verkrijgbaar" : " is niet verkrijgbaar"));
    };

    /**
     * Updates Event
     */
    updateEvent = async () => {
        const {...body}    = this.state;
        const updatedEvent = await this.props.updateEvent(this.props.authData.token, this.props.match.params.id, body);

        SuccessNotification(updatedEvent.data.eventName + " is aangepast!");
    };

    /**
     * Uploads image to the cloud for event banner
     *
     * @param e
     * @returns {Promise<void>}
     */
    uploadImageEvent = async (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0]);

        const uploadImage = await this.props.uploadImageEvent(this.props.authData.token, this.props.eventData.event._id, data);

        window.location.reload();
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

    /**
     * Formats price
     *
     * @param number
     * @returns {string}
     */
    formatPrice = (number) => {
        return new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(number)
    };


    render() {
        const {event} = this.props.eventData;

        return (
            <>
                <PanelHeader size="sm"/>
                <NotificationContainer/>

                <div className="content">
                    <Row>
                        <Col xs={12} md={6}>
                            <Card>
                                <div style={{position: "relative"}}>
                                    <form>
                                        <input type="file" className="custom-file-input" name="myImage"
                                               onChange={this.uploadImageEvent}
                                               style={{position: "absolute", height: "100%"}}/>

                                        <div className="event-image"
                                             style={{backgroundImage: "url(" + event.eventImage + ")"}}>
                                        </div>
                                    </form>
                                </div>
                                <CardBody>
                                    <div className="author">
                                        <h5 className="title">{event.eventName}</h5>
                                        <p className="description">{new Date(this.state.eventStart).toLocaleString() + " - " + new Date(this.state.eventEnd).toLocaleString()}</p>
                                    </div>
                                </CardBody>
                                <hr/>
                                <div className="button-container" onClick={this.shopActivationAlert}
                                     style={{display: "inline-block"}}>
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        target={"_blank"}
                                        href={"../../shop/event/" + event._id}
                                        size="lg"
                                    >
                                        <i className="now-ui-icons files_box"/>
                                    </Button>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Evenement bewerken</CardTitle>
                                    <p className="category">Hier kunt u uw evenement gegevens bewerken.</p>
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
                                                        value={this.state.eventName}
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
                                                        Evenement start datum/tijd
                                                    </label>
                                                    <Input

                                                        name="eventStart"
                                                        placeholder="Event start"
                                                        type="datetime-local"
                                                        value={this.state.eventStart}
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Evenement eind datum/tijd</label>
                                                    <Input
                                                        name="eventEnd"
                                                        placeholder="Event end"
                                                        type="datetime-local"
                                                        defaultValue={this.state.eventEnd}
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
                                                        placeholder="Location"
                                                        defaultValue={this.state.eventLocation}
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
                                                        placeholder="Minimum age"
                                                        defaultValue={this.state.eventAge}
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
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    await this.updateEvent();
                                                    await this.refresh();
                                                }}>
                                            Opslaan
                                        </button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Ticket Varianten</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Naam</th>
                                            <th>Prijs</th>
                                            <th>Verkoop</th>
                                            <th>Personen</th>
                                            <th>Verkocht</th>
                                            <th className="text-center">Acties</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.ticketVariants ? this.state.ticketVariants.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.description}</td>
                                                <td>{this.formatPrice(value.price)}</td>
                                                <td>{value.availability ? "Verkrijgbaar" : "Niet verkrijgbaar"}</td>
                                                <td>{value.personsAmount}</td>
                                                <td>0</td>
                                                <td className="text-center">
                                                    <a
                                                        href={"./ticketvariant/" + this.props.match.params.id + "/" + value._id}
                                                        className="btn-round btn-outline-default btn-icon btn btn-default"
                                                        style={{margin: "0px 5px"}}>
                                                        <i className="now-ui-icons loader_gear"></i>
                                                    </a>
                                                    <a href="#"
                                                       className="btn-round btn-outline-primary btn-icon btn btn-default"
                                                       style={{margin: "0px 5px"}} onClick={async (e) => {
                                                        e.preventDefault();
                                                        await this.toggleTicketVariant(value._id);
                                                        await this.refresh();
                                                    }}>
                                                        <i className="now-ui-icons media-1_button-power"></i>
                                                    </a>
                                                </td>
                                            </tr>)) : (<tr>
                                            <td></td>
                                        </tr>)}
                                        <tr>
                                            <td colSpan="5"></td>
                                            <td className="text-center">
                                                <a href="#"
                                                   className="btn-round btn-outline-default btn-icon btn btn-default"
                                                   style={{margin: "0px 5px"}} onClick={(e) => {
                                                    e.preventDefault();
                                                    this.refresh();
                                                }}>
                                                    <i className="now-ui-icons loader_refresh"></i>
                                                </a>
                                                <a href={"../event/ticketvariant/create/" + this.props.match.params.id}
                                                   className="btn-round btn-outline-success btn-icon btn btn-default"
                                                   style={{margin: "0px 5px"}}>
                                                    <i className="now-ui-icons ui-1_simple-add"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

EventRead.propTypes = {
    getEvent:            PropTypes.func.isRequired,
    toggleTicketVariant: PropTypes.func.isRequired,
    updateEvent:         PropTypes.func.isRequired,
    uploadImageEvent:    PropTypes.func.isRequired,
    userData:            PropTypes.object.isRequired,
    authData:            PropTypes.object.isRequired,
    eventData:           PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    authData:  state.authData,
    eventData: state.eventData,
});

export default connect(mapStateToProps, {getEvent, updateEvent, uploadImageEvent, toggleTicketVariant})(EventRead);
