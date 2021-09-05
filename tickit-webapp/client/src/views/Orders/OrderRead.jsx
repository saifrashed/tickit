import React from "react";
import {connect} from "react-redux";
import {getOrder} from "../../actions/orderActions";
import PropTypes from "prop-types";
// reactstrap components
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {NotificationContainer} from "../../components/Notifications/Notifications";
import {saveAs} from "file-saver"

class OrderRead extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order:          [],
            paymentDetails: {}
        }

    }

    /**
     * Initialise state
     */
    componentDidMount() {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getOrder(token, this.props.match.params.id)])
               .then(([order]) => {
                   this.setState({
                       order:          order.data,
                       paymentDetails: order.data.paymentDetails
                   });
               });
    }


    destructurePaymentDetails(paymentDetailsObj) {
        Object.entries(paymentDetailsObj).forEach(
            ([key, value]) => console.log(key, value)
        );
    }


    render() {

        console.log(this.state.paymentDetails);

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
                                            <h5 className="title">{this.state.order.firstName + " " + this.state.order.lastName}</h5>
                                        </a>

                                        <p className="description">{this.state.order._id}</p>

                                        <hr/>

                                        <a href={"mailto:" + this.state.order.email}
                                           className="btn-round btn-outline-success btn-icon btn btn-default"
                                           style={{margin: "0px 5px"}}>
                                            <i className="now-ui-icons ui-1_email-85"></i>
                                        </a>


                                        <button className="btn-round btn-outline-success btn-icon btn btn-default"
                                                style={{margin: "0px 5px"}} onClick={(e) => {
                                            e.preventDefault()
                                        }}>

                                            <i className="now-ui-icons ui-1_send single-copy-04"></i>
                                        </button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Informatie</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="typography-line">
                                        <span>Email</span>
                                        <p className="text-muted">
                                            {this.state.order.email}
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Betaling</h5>
                                </CardHeader>
                                <CardBody>


                                    {this.state.paymentDetails ? this.destructurePaymentDetails(this.state.paymentDetails) : ""}

                                    <div className="typography-line">
                                        <span>sfds</span>
                                        <p className="text-muted">
                                            34
                                        </p>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

OrderRead.propTypes = {
    getOrder:  PropTypes.func.isRequired,
    userData:  PropTypes.object.isRequired,
    authData:  PropTypes.object.isRequired,
    orderData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    authData:  state.authData,
    orderData: state.orderData,
});

export default connect(mapStateToProps, {getOrder})(OrderRead);
