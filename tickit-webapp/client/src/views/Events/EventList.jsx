import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {getUser} from "../../actions/userActions";
import {deleteEvent, getActiveEvents, getInactiveEvents} from "../../actions/eventActions";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer, SuccessNotification} from "../../components/Notifications/Notifications";

// reactstrap

class EventList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeEvents:   [],
            inactiveEvents: [],
            isLoaded:       false
        }
    }

    /**
     * Initialise state
     */
    componentDidMount() {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getActiveEvents(token), this.props.getInactiveEvents(token)])
               .then(([activeEvents, inactiveEvents]) => {
                   this.setState({
                       activeEvents:   activeEvents.data,
                       inactiveEvents: inactiveEvents.data,
                       isLoaded:       true
                   });
               });
    }

    /**
     * Refresh component state
     */
    refresh = async () => {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getActiveEvents(token), this.props.getInactiveEvents(token)])
               .then(([activeEvents, inactiveEvents]) => {
                   this.setState({
                       activeEvents:   activeEvents.data,
                       inactiveEvents: inactiveEvents.data,
                       isLoaded:       true
                   });

                   SuccessNotification("Bijgewerkt!");
               });
    };

    /**
     * Deletes Event
     */
    deleteEvent = async (id) => {
        const deletedEvent = await this.props.deleteEvent(this.props.authData.token, id);

        SuccessNotification(deletedEvent.data.eventName + "is verwijderd!");
    };


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
                                    <CardTitle tag="h4">Evenementen</CardTitle>
                                    <p className="category">Al uw geplande evenementen</p>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Naam</th>
                                            <th>Start tijd/datum</th>
                                            <th>Eind tijd/datum</th>
                                            <th>Locatie</th>
                                            <th className="text-center">Acties</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.activeEvents ? this.state.activeEvents.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.eventName}</td>
                                                <td>{new Date(value.eventStart).toLocaleString()}</td>
                                                <td>{new Date(value.eventEnd).toLocaleString()}</td>
                                                <td>{value.eventLocation}</td>
                                                <td className="text-center">
                                                    <a href={"./event/" + value._id}
                                                       className="btn-round btn-outline-default btn-icon btn btn-default"
                                                       style={{margin: "0px 5px"}}>
                                                        <i className="now-ui-icons loader_gear"></i>
                                                    </a>
                                                    <a href="#"
                                                       className="btn-round btn-outline-primary btn-icon btn btn-default"
                                                       style={{margin: "0px 5px"}} onClick={(e) => {
                                                        e.preventDefault();
                                                        this.deleteEvent(value._id);
                                                        this.props.getUser(this.props.authData.token);
                                                    }}>
                                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        )) : "U hebt nog geen evenementen."}
                                        <tr>
                                            <td colSpan="4"></td>
                                            <td className="text-center">
                                                <a href="#"
                                                   className="btn-round btn-outline-default btn-icon btn btn-default"
                                                   style={{margin: "0px 5px"}} onClick={async (e) => {
                                                    e.preventDefault();
                                                    await this.refresh();
                                                }}>
                                                    <i className="now-ui-icons loader_refresh"></i>
                                                </a>
                                                <a href="./event/create"
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
                        <Col xs={12}>
                            <Card className="card-plain">
                                <CardHeader>
                                    <CardTitle tag="h4">Afgelopen evenementen</CardTitle>
                                    <p className="category"> Evenementen die u hebt gehad</p>
                                </CardHeader>
                                <CardBody>

                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Naam</th>
                                            <th>Start tijd/datum</th>
                                            <th>Eind tijd/datum</th>
                                            <th>Locatie</th>
                                            <th className="text-center">Bezoekers</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.inactiveEvents ? this.state.inactiveEvents.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.eventName}</td>
                                                <td>{new Date(value.eventStart).toLocaleString()}</td>
                                                <td>{new Date(value.eventEnd).toLocaleString()}</td>
                                                <td>{value.eventLocation}</td>
                                                <td className="text-center">50</td>
                                            </tr>
                                        )) : "U hebt nog geen evenementen."}
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

EventList.propTypes = {
    deleteEvent:       PropTypes.func.isRequired,
    getActiveEvents:   PropTypes.func.isRequired,
    getInactiveEvents: PropTypes.func.isRequired,
    getUser:           PropTypes.func.isRequired,
    userData:          PropTypes.object.isRequired,
    authData:          PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    authData:  state.authData,
    eventData: state.eventData,
});

export default connect(mapStateToProps, {getUser, getActiveEvents, getInactiveEvents, deleteEvent})(EventList);
