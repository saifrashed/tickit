import React from "react";
// reactstrap components
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row, Table} from "reactstrap";

import {connect} from "react-redux";
import {getEvent, updateEvent, uploadImageEvent} from "../../actions/eventActions";
import {toggleTicketVariant} from "../../actions/ticketVariantActions";
import PropTypes from "prop-types";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {Bar, Line} from "react-chartjs-2";
import {NotificationContainer, SuccessNotification, WarningNotification} from "../../components/Notifications/Notifications";

import {dashboard24HoursPerformanceChart, dashboardAllProductsChart} from "variables/charts.jsx";


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
     * Gets event
     */
    componentWillMount() {
        this.props.getEvent(this.props.match.params.id);
        this.shopActivationAlert();
    }

    /**
     * Handles shoppage notification for admin
     */
    shopActivationAlert = async () => {
        const event = await this.props.getEvent(this.props.match.params.id);

        if (this.props.eventData.event.ticketVariants.length) {
            SuccessNotification("Bekijk de shop online!");
        } else {
            WarningNotification("Voeg ticket varianten toe.");
        }
    };


    /**
     * Deletes Event
     */
    toggleTicketVariant = async (id) => {

        const toggledTicketVariant = await this.props.toggleTicketVariant(this.props.authData.token, id);
        const event                = await this.props.getEvent(this.props.match.params.id);

        console.log(toggledTicketVariant);

        SuccessNotification(toggledTicketVariant.data.description + (toggledTicketVariant.data.availability ? " is verkrijgbaar" : " is niet verkrijgbaar"));
    };

    /**
     * Updates Event
     */
    updateEvent = async () => {
        const {...body} = this.state;

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
                                        <p className="description">{new Date(event.eventStart).toLocaleString() + " - " + new Date(event.eventEnd).toLocaleString()}</p>
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
                                                        defaultValue={event.eventName}
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
                                                        disabled
                                                        name="eventStart"
                                                        placeholder="Event start"
                                                        defaultValue={event.eventStart}
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
                                                        disabled
                                                        name="eventEnd"
                                                        placeholder="Event end"
                                                        defaultValue={event.eventEnd}
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
                                                        defaultValue={event.eventLocation}
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
                                                        defaultValue={event.eventAge}
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
                                                    this.updateEvent();
                                                }}>
                                            Opslaan
                                        </button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Check-in</CardTitle>
                                    <h5 className="card-category">Statistieken</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Bar
                                            data={dashboard24HoursPerformanceChart.data}
                                            options={dashboard24HoursPerformanceChart.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Bestellingen</CardTitle>
                                    <h5 className="card-category">Statistieken</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={dashboardAllProductsChart.data}
                                            options={dashboardAllProductsChart.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
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
                                            <th>Bestellingen</th>
                                            <th className="text-center">Acties</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {event.ticketVariants ? event.ticketVariants.map((value, index) => (
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
                                                       style={{margin: "0px 5px"}} onClick={(e) => {
                                                        e.preventDefault();
                                                        this.toggleTicketVariant(value._id);
                                                    }}>
                                                        <i className="now-ui-icons media-1_button-power"></i>
                                                    </a>
                                                </td>
                                            </tr>)) : ""}
                                        <tr>
                                            <td colSpan="5"></td>
                                            <td className="text-center">
                                                <a href="#"
                                                   className="btn-round btn-outline-default btn-icon btn btn-default"
                                                   style={{margin: "0px 5px"}} onClick={(e) => {
                                                    e.preventDefault();
                                                    this.props.getEvent(this.props.match.params.id);
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
