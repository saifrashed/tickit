import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOrder, toPayment, updateOrder} from "../../actions/orderActions";
import Lottie from 'react-lottie';
import * as animationData from '../../assets/animations/greenTick.json'
import Footer from "../../components/Footer/Footer"

/**
 * Shop Thank you page
 */
class Confirmation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orderId:   this.props.match.params.id,
            firstName: "",
            lastName:  "",
            email:     "",
            order:     [],
            subTotal:  null,
            total:     null
        }
    }


    componentWillMount() {
        this.getOrder();
    }

    /**
     * On "go to checkout" click, create an order.
     * @returns {Promise<void>}
     */
    getOrder = async () => {
        const newOrder = await this.props.getOrder(this.props.match.params.id);

        const {firstName, lastName, email, products, subTotal, total} = newOrder.data;

        this.setState({
            firstName: firstName,
            lastName:  lastName,
            email:     email,
            order:     products,
            subTotal:  subTotal.$numberDecimal,
            total:     total.$numberDecimal
        });
    };


    render() {


        // lottie options
        const defaultOptions = {
            loop:          false,
            autoplay:      true,
            animationData: animationData.default,
        };

        return (
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
                    </div>

                    <div className="content text-center p-3">
                        <Lottie options={defaultOptions} height={400} width={"100%"}/>

                        <h2>Veel plezier!</h2>
                        <p className="text-muted text-center text-small">
                            U heeft betaald en uw bestelling wordt momenteel verwerkt. Wanneer dit klaar is krijgt u
                            een mail met de tickets.
                        </p>
                    </div>


                    <Footer/>
                </div>
            </section>
        );
    }
}

Confirmation.propTypes = {
    getOrder:    PropTypes.func.isRequired,
    updateOrder: PropTypes.object.isRequired,
    toPayment:   PropTypes.object.isRequired,
    orderData:   PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    orderData: state.orderData,
});

export default connect(mapStateToProps, {getOrder, updateOrder, toPayment})(Confirmation);
