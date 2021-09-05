import React from "react";

import {getOrder, toPayment, updateOrder} from "../../actions/orderActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NotificationContainer, WarningNotification} from "../../components/Notifications/Notifications";
import Footer from "../../components/Footer/Footer"


/**
 * Check out page
 */
class ShopCheckout extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            orderId:      this.props.match.params.id,
            firstName:    "",
            lastName:     "",
            email:        "",
            confirmEmail: "",
            order:        [],
            subTotal:     null,
            total:        null
        }
    }


    componentWillMount() {
        this.getOrder();
    }


    /**
     * Checks user input for further actions
     */
    inputValidation = () => {

        if (!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.confirmEmail) {
            WarningNotification("Controleer of alle velden zijn ingevuld.");
            return false;
        }

        // checks if confirmation email has been filled in
        if (this.state.confirmEmail !== this.state.email) {
            WarningNotification("Emails komen niet overeen.");
            return false;
        }

        return true;
    };

    /**
     * On "go to checkout" click, create an order.
     * @returns {Promise<void>}
     */
    getOrder = async () => {
        const newOrder = await this.props.getOrder(false, this.props.match.params.id);

        const {products, subTotal, total} = newOrder.data;

        console.log(newOrder);

        this.setState({
            order:    products,
            subTotal: subTotal.$numberDecimal,
            total:    total.$numberDecimal
        });
    };

    /**
     * Updates order with new information and starts payment process
     * @returns {Promise<void>}
     */
    toPayment = async () => {


        // input check
        if (!this.inputValidation()) {
            return false;
        }

        const updatedOrder   = await this.props.updateOrder(this.props.match.params.id, this.state);
        const paymentPage    = await this.props.toPayment(this.state.orderId);
        window.location.href = paymentPage.data
    };

    /**
     * Formats price for EU
     * @param number
     * @returns {string}
     */
    formatPrice = (number) => {
        return new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(number)
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
                <NotificationContainer/>

                <section className="shopping-cart dark">
                    <div className="container" style={{maxWidth: "960px"}}>
                        <div className="block-heading">
                            <img src={require("../../assets/img/tickit_logo.png")}
                                 style={{
                                     width:    "150px",
                                     position: "absolute",
                                     top:      "25px",
                                     left:     "0",
                                     right:    "0",
                                     margin:   "auto"
                                 }}/>

                            <h2>Afrekenen</h2>
                            <p>
                                U zal verwezen worden naar een betaal pagina waarna u de factuur en tickets ontvangen
                                zal
                                krijgen via mail of anders kunt downloaded op een pagina.
                            </p>
                        </div>

                        <div className="row">
                            <div className="col-md-4 order-md-2 mb-4">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Winkelmand</span>
                                    <span className="badge badge-secondary badge-pill">{this.state.order.length}</span>
                                </h4>
                                <ul className="list-group mb-3">
                                    {this.state.order ? this.state.order.map((value, index) => (
                                        <li key={index}
                                            className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{value.ticketVariant.description}</h6>
                                                <small className="text-muted">x {value.quantity}</small>
                                            </div>
                                            <span
                                                className="text-muted">{this.formatPrice(value.ticketVariant.price)}</span>
                                        </li>
                                    )) : "Producten gevonden"}


                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Subtotaal (EUR)</span>
                                        <strong>{this.formatPrice(this.state.subTotal)}</strong>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Totaal (EUR)</span>
                                        <strong>{this.formatPrice(this.state.total)}</strong>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-8 order-md-1">
                                <h4 className="mb-3">Checkout</h4>
                                <form action={"#"}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="firstName">Voornaam</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="firstName"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   id="firstName"
                                                   required
                                            />
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastName">Achternaam</label>
                                            <input type="text"
                                                   className="form-control"
                                                   name="lastName"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   id="lastName"
                                                   required
                                            />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email">Email</label>
                                            <input type="email"
                                                   className="form-control"
                                                   name="email"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   id="email"
                                            />
                                            <div className="invalid-feedback">
                                                Please enter a valid email address for shipping updates.
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email">Bevestig Email</label>
                                            <input type="email"
                                                   className="form-control"
                                                   name="confirmEmail"
                                                   onChange={(e) => {
                                                       this.handleChange(e)
                                                   }}
                                                   id="email"
                                            />
                                            <div className="invalid-feedback">
                                                Please enter a valid email address for shipping updates.
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="mb-4"/>

                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="same-address"/>
                                        <label className="custom-control-label" htmlFor="same-address">
                                            Ik ga akkoord met de privacy & algemene voorwaarden
                                        </label>
                                    </div>

                                    <hr className="mb-4"/>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={(e) => {
                                        e.preventDefault();
                                        this.toPayment();
                                    }}>
                                        Naar betalen
                                    </button>
                                </form>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                </section>
            </>
        );
    }
}


ShopCheckout.propTypes = {
    getOrder:    PropTypes.func.isRequired,
    updateOrder: PropTypes.object.isRequired,
    toPayment:   PropTypes.object.isRequired,
    orderData:   PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    orderData: state.orderData,
});

export default connect(mapStateToProps, {getOrder, updateOrder, toPayment})(ShopCheckout);
