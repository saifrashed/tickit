import React from "react";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {connect} from "react-redux";
import {addTicketVariant} from "../../../actions/ticketVariantActions";
import PropTypes from "prop-types";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer} from "../../../components/Notifications/Notifications";

import {dashboard24HoursPerformanceChart, dashboardAllProductsChart} from "variables/charts.jsx";

/**
 * Add ticket variant
 */
class TicketVariantAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description:   "",
            price:         "",
            availability:  true,
            personsAmount: "",
            event:         this.props.match.params.id,
        }
    }

    /**
     * Creates ticket variant
     */
    addTicketVariant = async () => {
        const {...body}        = this.state;
        const newTicketVariant = await this.props.addTicketVariant(this.props.authData.token, body);
        this.props.history.push("../../" + this.props.match.params.id);
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
                        <Col xs={12} md={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Ticket variant creëren</CardTitle>
                                    <p className="category">creëren een ticket variant.</p>
                                </CardHeader>

                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>
                                                        Naam
                                                    </label>
                                                    <Input
                                                        name="description"
                                                        placeholder="Naam"
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
                                                        type="number"
                                                        onChange={(e) => {
                                                            this.handleChange(e)
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <button className="btn-round btn btn-success"
                                                style={{fontSize: "1em"}}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.addTicketVariant();
                                                }}>
                                            Verzend
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

TicketVariantAdd.propTypes = {
    addTicketVariant:  PropTypes.func.isRequired,
    userData:          PropTypes.object.isRequired,
    authData:          PropTypes.object.isRequired,
    eventData:         PropTypes.object.isRequired,
    ticketVariantData: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    userData:          state.userData,
    authData:          state.authData,
    eventData:         state.eventData,
    ticketVariantData: state.ticketVariantData,
});

export default connect(mapStateToProps, {addTicketVariant})(TicketVariantAdd);
