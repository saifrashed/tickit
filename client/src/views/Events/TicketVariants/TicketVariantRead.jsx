import React from "react";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
// reactstrap
import {connect} from "react-redux";
import {getUser} from "../../../actions/userActions";
import {addEvent, getEvent} from "../../../actions/eventActions";
import {getTicketVariant, updateTicketVariant} from "../../../actions/ticketVariantActions";
import PropTypes from "prop-types";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer, SuccessNotification} from "../../../components/Notifications/Notifications";


import {dashboard24HoursPerformanceChart, dashboardAllProductsChart} from "variables/charts.jsx";


/**
 * Ticket variant read
 */
class TicketVariantRead extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            _id:           "",
            description:   "",
            price:         "",
            availability:  true,
            personsAmount: "",
            event:         this.props.match.params.id,
        }
    }

    componentWillMount() {
        this.props.getTicketVariant(this.props.match.params.ticketVariantId);
    }


    /**
     * Update ticket variant
     * @returns {Promise<void>}
     */
    updateTicketVariant = async () => {
        const {...body} = this.state;

        const updatedTicketVariant = await this.props.updateTicketVariant(this.props.authData.token, this.props.match.params.ticketVariantId, body);

        SuccessNotification("Ticket variant is opgeslagen!")
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
        const {ticketVariants} = this.props.ticketVariantData;

        return (
            <>
                {console.log(this.props)}
                <PanelHeader size="sm"/>
                <NotificationContainer/>

                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Opslaan</CardTitle>
                                    <p className="category">Bewerk hier de ticket variant.</p>
                                </CardHeader>

                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>
                                                        Beschrijving
                                                    </label>
                                                    <Input
                                                        name="description"
                                                        placeholder="Beschrijving"
                                                        defaultValue={ticketVariants.description}
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Prijs (EUR)</label>
                                                    <Input
                                                        name="price"
                                                        placeholder="Prijs"
                                                        defaultValue={ticketVariants.price}
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Personen toegelaten per ticket</label>
                                                    <Input
                                                        name="personsAmount"
                                                        placeholder="Hoeveelheid"
                                                        defaultValue={ticketVariants.personsAmount}
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
                                                    this.updateTicketVariant()
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

TicketVariantRead.propTypes = {
    getUser:             PropTypes.func.isRequired,
    getTicketVariant:    PropTypes.func.isRequired,
    updateTicketVariant: PropTypes.func.isRequired,
    userData:            PropTypes.object.isRequired,
    authData:            PropTypes.object.isRequired,
    eventData:           PropTypes.object.isRequired,
    ticketVariantData:   PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userData:          state.userData,
    authData:          state.authData,
    eventData:         state.eventData,
    ticketVariantData: state.ticketVariantData,
});


export default connect(mapStateToProps, {
    getUser,
    addEvent,
    getEvent,
    updateTicketVariant,
    getTicketVariant
})(TicketVariantRead);
