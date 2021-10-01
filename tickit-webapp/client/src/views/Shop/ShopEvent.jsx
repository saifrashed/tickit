import React from "react";

import {connect} from "react-redux";
import {getEvent} from "../../actions/eventActions";
import {addOrder} from "../../actions/orderActions";
import PropTypes from "prop-types";
import {NotificationContainer, SuccessNotification, WarningNotification} from "../../components/Notifications/Notifications";
import Footer from "../../components/Footer/Footer"

/**
 * Event ticket selection page¬
 */
class ShopEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orderTotals: {},
            order:       [],
        }
    }

    componentDidMount() {
        Promise.all([this.props.getEvent(this.props.match.params.id)])
               .then(([event]) => {
                   this.calculateTotals();

                   if (event.data[0].ticketVariants.length) {
                       SuccessNotification("Koop hier uw tickets!");
                   } else {
                       WarningNotification("Er is momenteel geen aanbod");
                   }
               });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.order !== this.state.order) {
            this.calculateTotals();
        }
    }


    /**
     * On "go to checkout" click, create an order.
     * @returns {Promise<void>}
     */
    addOrder = async () => {

        const {order, orderTotals} = this.state;

        // required parameters for the creation of an order
        const body = {
            products: order,
            subTotal: orderTotals.subTotal,
            total:    orderTotals.total,
            isPaid:   false,
            eventId:  this.props.match.params.id
        };

        const newOrder = await this.props.addOrder(body);
        this.props.history.push("../checkout/" + newOrder.data._id);

    };

    /**
     * Creates and updates order
     * @param ticketVariantId
     * @param e
     */
    updateOrder = (ticketVariantId, e) => {
        var targetVariant = this.getTargetProduct(ticketVariantId);

        // input validation
        if (!e.target.validity.valid || !e.target.value) {
            return false;
        }

        const order = {
            ticketVariant: targetVariant[0],
            quantity:      e.target.value
        };

        // finds and updates order item in array
        var index = this.getProductIndex(ticketVariantId);

        if (index === -1) {
            this.addTickets(order)
        } else {
            this.editOrder(index, parseInt(e.target.value));
        }
    };

    /**
     * Increment a ticket variant in the order
     * @param ticketVariantId
     */
    incrementOrder = (ticketVariantId) => {
        var targetVariant = this.getTargetProduct(ticketVariantId);
        var index         = this.getProductIndex(ticketVariantId);

        const order = {
            ticketVariant: targetVariant[0],
            quantity:      (this.state.order[index] ? this.state.order[index].quantity + 1 : 1)
        };

        if (index === -1) {
            this.addTickets(order)
        } else {
            this.editOrder(index, this.state.order[index].quantity + 1);
        }
    };


    /**
     * Decrement a ticket variant in the order
     * @param ticketVariantId
     */
    decrementOrder = (ticketVariantId) => {

        var targetVariant = this.getTargetProduct(ticketVariantId);
        var index         = this.getProductIndex(ticketVariantId);


        // input validation
        if ((parseInt(this.state.order[index].quantity) - 1) === -1) {
            return false;
        }

        const order = {
            ticketVariant: targetVariant[0],
            quantity:      (this.state.order[index] ? this.state.order[index].quantity + 1 : 1)
        };

        if (index === -1) {
            this.addTickets(order)
        } else {
            this.editOrder(index, this.state.order[index].quantity - 1);
        }
    };


    /**
     * Get target variant with a ticket variant ID
     * @param ticketVariantId
     * @returns {*}
     */
    getTargetProduct(ticketVariantId) {
        return this.props.eventData.event.ticketVariants.filter(obj => {
            return obj._id === ticketVariantId;
        });
    }

    /**
     * Get index of a product within order
     * @param ticketVariantId
     * @returns {*}
     */
    getProductIndex(ticketVariantId) {
        return this.state.order.findIndex(x => x.ticketVariant._id === ticketVariantId);
    }

    /**
     * Add a order
     * @param order
     */
    addTickets(order) {
        this.setState({
            order: this.state.order.concat(order)
        });
    }

    /**
     * Edit a order
     * @param index
     * @param newQuantity
     */
    editOrder(index, newQuantity) {

        if (newQuantity == 0) {
            this.setState({
                order: [
                    ...this.state.order.slice(0, index),
                ]
            })
        } else {
            this.setState({
                order: [
                    ...this.state.order.slice(0, index),
                    Object.assign({}, this.state.order[index], {quantity: parseInt(newQuantity)}),
                    ...this.state.order.slice(index + 1)
                ]
            })
        }
    }

    /**
     * Calculates totals
     */
    calculateTotals = () => {

        let subTotal        = 0;
        let transactionCost = 0;
        let total           = 0;

        this.state.order.forEach(function (item, index) {
            subTotal += item.ticketVariant.price * item.quantity;
        });


        if (subTotal !== 0) {
            total           = ((subTotal / 100 * 3) + 0.30) + subTotal;
            transactionCost = (subTotal / 100 * 3) + 0.30;
        }


        this.setState({
            orderTotals: {
                subTotal:        subTotal,
                transactionCost: transactionCost,
                total:           total
            }
        });
    };

    /**
     * Formats price for EU
     * @param number
     * @returns {string}
     */
    formatPrice = (number) => {
        return new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(number)
    };


    render() {
        const {event}   = this.props.eventData;
        let buttonClass = this.state.orderTotals.total ? "btn btn-primary btn-lg btn-block" : "btn btn-primary btn-lg btn-block disabled";

        console.log(event);

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
                            <h2 className={"mb-0 mt-5"}>{event.eventName}</h2>
                            <p className="description"
                               style={{color: "#000"}}>{new Date(event.eventStart).toLocaleString() + " - " + new Date(event.eventEnd).toLocaleString()}</p>
                            <p className="description" style={{color: "#000"}}>{event.eventLocation}</p>

                        </div>

                        <div className="content">
                            <div className="row">
                                <div className="col-md-12 col-lg-8 pr-md-0">
                                    <div className="event-image"
                                         style={{backgroundImage: "url(" + event.eventImage + ")"}}>
                                    </div>
                                    <div className="items">
                                        {event.ticketVariants ? event.ticketVariants.map((value, index) => (
                                            <div className="product" key={index}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="info">
                                                            <div className="row">
                                                                <div className="col-md-5 product-name">
                                                                    <div className="product-name">
                                                                        <a href="#">{value.description}</a>
                                                                        <div className="product-info">
                                                                            <div>Personen: <span
                                                                                className="value">{value.personsAmount}</span>
                                                                            </div>
                                                                            <div>Beschikbaar: <span
                                                                                className="value">{value.availability ? "Ja" : "Nee"}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4 quantity">
                                                                    <label htmlFor="quantity">Aantal:</label>

                                                                    {value.availability ? (
                                                                        <div>
                                                                            <button
                                                                                className={"btn-round btn-outline-danger btn-icon btn btn-default " + (this.getProductIndex(value._id) != -1 ? " " : "disabled")}
                                                                                style={{margin: "0px 5px"}}
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    this.decrementOrder(value._id);
                                                                                }}>

                                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                                            </button>

                                                                            <input id="quantity"
                                                                                   name="quantity"
                                                                                   type="number"
                                                                                   min="0"
                                                                                   value={this.state.order[this.getProductIndex(value._id)] ? this.state.order[this.getProductIndex(value._id)].quantity : 0}
                                                                                   onChange={(e) => {
                                                                                       this.updateOrder(value._id, e)
                                                                                   }}
                                                                                   className="form-control quantity-input"/>

                                                                            <button
                                                                                className={"btn-round btn-outline-success btn-icon btn btn-default"}
                                                                                style={{margin: "0px 5px"}}
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    this.incrementOrder(value._id);
                                                                                }}>

                                                                                <i className="now-ui-icons ui-1_simple-add"></i>
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                         <div>

                                                                             <button
                                                                                 className={"btn-round btn-outline-danger btn-icon btn btn-default disabled"}
                                                                                 style={{margin: "0px 5px"}}
                                                                                 onClick={(e) => {
                                                                                     e.preventDefault();
                                                                                 }}>

                                                                                 <i className="now-ui-icons ui-1_simple-delete"></i>
                                                                             </button>
                                                                             <input disabled
                                                                                    id="quantity"
                                                                                    name="quantity"
                                                                                    type="number"
                                                                                    min="0"
                                                                                    defaultValue={0}
                                                                                    className="form-control quantity-input"/>
                                                                             <button
                                                                                 className={"btn-round btn-outline-success btn-icon btn btn-default disabled"}
                                                                                 style={{margin: "0px 5px"}}
                                                                                 onClick={(e) => {
                                                                                     e.preventDefault();
                                                                                 }}>

                                                                                 <i className="now-ui-icons ui-1_simple-add"></i>
                                                                             </button>
                                                                         </div>
                                                                     )}

                                                                </div>
                                                                <div className="col-md-3 price">
                                                                    <span>{this.formatPrice(value.price)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : ""}

                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-4 pl-md-0">
                                    <div className="summary">
                                        <h3>Betaal overzicht</h3>

                                        <div className="summary-item">
                                            <span className="text">Subtotaal</span>
                                            <span
                                                className="price">{this.formatPrice(this.state.orderTotals.subTotal)}</span>
                                        </div>

                                        <div className="summary-item">
                                            <span className="text">Transactie kosten</span>
                                            <span
                                                className="price">{this.formatPrice(this.state.orderTotals.transactionCost)}</span>
                                        </div>

                                        <div className="summary-item">
                                            <br/>
                                            <span className="text">Totaal (Incl. BTW)</span>
                                            <span
                                                className="price">{this.formatPrice(this.state.orderTotals.total)}</span>
                                        </div>

                                        <a href={"../checkout"}
                                           onClick={(e) => {
                                               e.preventDefault();
                                               this.addOrder()
                                           }}
                                           className={buttonClass}>Afrekenen</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                </section>
            </>
        );
    }
}


ShopEvent.propTypes = {
    getEvent:  PropTypes.func.isRequired,
    eventData: PropTypes.object.isRequired,
    addOrder:  PropTypes.func.isRequired,
    orderData: PropTypes.object.isRequired,
    userData:  PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    eventData: state.eventData,
    orderData: state.orderData,
});

export default connect(mapStateToProps, {getEvent, addOrder})(ShopEvent);
