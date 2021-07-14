import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import {Redirect, Route, Switch} from "react-router-dom";
// core
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
//routes
import routes from "../routes/routes.js";
// event views
import EventAdd from "views/Events/EventAdd";
import EventRead from "views/Events/EventRead";
// ticketvariant views
import TicketVariantAdd from "views/Events/TicketVariants/TicketVariantAdd";
import TicketVariantRead from "views/Events/TicketVariants/TicketVariantRead";
// order views
import OrderRead from "views/Orders/OrderRead";


var ps;

class Dashboard extends React.Component {
    state     = {
        backgroundColor: "orange"
    };
    mainPanel = React.createRef();

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.mainPanel.current);
            document.body.classList.toggle("perfect-scrollbar-on");
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
            document.body.classList.toggle("perfect-scrollbar-on");
        }
    }

    componentDidUpdate(e) {
        if (e.history.action === "PUSH") {
            this.mainPanel.current.scrollTop    = 0;
            document.scrollingElement.scrollTop = 0;
        }
    }

    handleColorClick = color => {
        this.setState({backgroundColor: color});
    };

    render() {
        return (
            <div className="wrapper">
                <Sidebar
                    {...this.props}
                    routes={routes}
                    backgroundColor={this.state.backgroundColor}
                />

                <div className="main-panel" ref={this.mainPanel}>
                    <Navbar {...this.props} />

                    <Switch>


                        <Route exact path={"/admin/event/create"} component={EventAdd}/>
                        <Route exact path={"/admin/event/:id"} component={EventRead}/>
                        <Route exact path={"/admin/event/ticketvariant/create/:id"} component={TicketVariantAdd}/>
                        <Route exact path={"/admin/event/ticketvariant/:id/:ticketVariantId"}
                               component={TicketVariantRead}/>
                        <Route exact path={"/admin/orders/:id"} component={OrderRead}/>

                        {routes.map((prop, key) => {
                            return (
                                <Route path={prop.layout + prop.path} key={key} render={(props) => (
                                    <prop.component {...props}/>
                                )}/>
                            );
                        })}

                        <Redirect exact from={"/admin"} to={"/admin/dashboard"}/>
                    </Switch>

                    <Footer fluid/>
                </div>

                <FixedPlugin
                    bgColor={this.state.backgroundColor}
                    handleColorClick={this.handleColorClick}
                />
            </div>
        );
    }
}

export default Dashboard;
