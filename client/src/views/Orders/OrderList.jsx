import React from "react";
import {connect} from "react-redux";
import {getOrders} from "../../actions/orderActions";
import PropTypes from "prop-types";
// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer, SuccessNotification} from "../../components/Notifications/Notifications";


class OrderList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            tbody:  [],
            orders: []
        };
    }

    /**
     * Initialise state
     */
    componentDidMount() {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getOrders(token)])
               .then(([orders]) => {
                   this.setState({
                       orders: orders.data
                   });

                   SuccessNotification("Bestellingen zijn ingeladen")
               });
    }

    /**
     * Refresh component state
     */
    refresh = () => {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getOrders(token)])
               .then(([orders]) => {
                   this.setState({
                       orders: orders.data
                   });

                   SuccessNotification("Bijgewerkt!")
               });
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
                                    <CardTitle tag="h4">Bestellingen</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Bestellingnummer</th>
                                            <th>Voornaam</th>
                                            <th>Achternaam</th>
                                            <th>Email</th>
                                            <th>Datum</th>
                                            <th className="text-center"> Details</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {this.state.orders ? this.state.orders.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value._id}</td>
                                                <td>{value.firstName}</td>
                                                <td>{value.lastName}</td>
                                                <td>{value.email}</td>
                                                <td>{new Date(value.createdAt).toLocaleString()}</td>
                                                <td className="text-center">
                                                    <a href={"./orders/" + value._id} type="button" aria-haspopup="true"
                                                       aria-expanded="false"
                                                       className="btn-round btn-outline-default btn-icon btn btn-default"
                                                       style={{margin: "0px 5px"}}>
                                                        <i className="now-ui-icons ui-1_zoom-bold"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        )) : "U hebt nog geen bestellingen."}

                                        <tr>
                                            <td colSpan="5"></td>
                                            <td className="text-center">
                                                <a href="#"
                                                   className="btn-round btn-outline-default btn-icon btn btn-default"
                                                   style={{margin: "0px 5px"}} onClick={async (e) => {
                                                    e.preventDefault();
                                                    await this.refresh();
                                                }}>
                                                    <i className="now-ui-icons loader_refresh"></i>
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

OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    userData:  PropTypes.object.isRequired,
    authData:  PropTypes.object.isRequired,
    orderData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    authData:  state.authData,
    orderData: state.orderData,
});

export default connect(mapStateToProps, {getOrders})(OrderList);
