import React from "react";
import {Route, Switch} from "react-router-dom";
import ShopEvent from "../views/Shop/ShopEvent";
import ShopCheckout from "../views/Shop/ShopCheckout";
import Confirmation from "../views/Shop/Confirmation";

class Shop extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/shop/event/:id"} component={ShopEvent}/>
                <Route exact path={"/shop/checkout/:id"} component={ShopCheckout}/>
                <Route exact path={"/shop/confirmation/:id"} component={Confirmation}/>
            </Switch>
        );
    }
}

export default Shop;
