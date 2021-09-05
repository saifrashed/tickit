import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// react plugin used to create charts
import {Bar, Line} from "react-chartjs-2";
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import {dashboardMonthlyPerformanceChart, dashboardPanelChart} from "variables/charts.jsx";
import {getDailyOrderReport, getMonthlyOrderReport, getYearlyOrderReport} from "../actions/orderActions";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dashboardPanelChart: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dashboardProfitPerformanceChart: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    }

    /**
     * Initialise state
     */
    componentDidMount() {
        const token = this.props.authData.token; // User token

        Promise.all([this.props.getMonthlyOrderReport(token)])
               .then(([monthlyReport]) => {
                   this.handleDashboardChartData(monthlyReport)
               });
    }

    /**
     * Main dashboard statistics displaying order count on monthly basis
     * @param monthlyReport
     * @returns {Promise<void>}
     */
    handleDashboardChartData = async (monthlyReport) => {
        monthlyReport.data.map(value => {
            let newOrderState = this.state.dashboardPanelChart;
            let newProfitState = this.state.dashboardProfitPerformanceChart;

            if(this.isCurrentDate(value._id.year)) {
                newOrderState[value._id.month] = value.orders;
                newProfitState[value._id.month] = value.total.$numberDecimal;
            }

            this.setState({
                dashboardPanelChart: newOrderState,
                dashboardProfitPerformanceChart: newProfitState
            })
        })
    };


    /**
     * Checks if value is current year
     * @param date
     */
    isCurrentDate = (date) => {
        return (date === new Date().getFullYear());
    };


    render() {
        console.log(this.state.dashboardProfitPerformanceChart);
        return (
            <>
                <PanelHeader
                    size="lg"
                    content={
                        <Line
                            data={dashboardPanelChart(this.state.dashboardPanelChart).data}
                            options={dashboardPanelChart(this.state.dashboardPanelChart).options}
                        />
                    }
                />

                <div className="content">
                    <Row>
                        <Col xs={12} md={6}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Maandelijkse totalen</h5>
                                    <CardTitle tag="h4">Omzet</CardTitle>
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-round btn-outline-default btn-icon"
                                            color="default"
                                        >
                                            <i className="now-ui-icons loader_gear"/>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>Netto omzet (Exclusief Servicekosten & BTW)</DropdownItem>
                                            <DropdownItem>Bruto omzet (Inclusief Servicekosten & BTW))</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={dashboardMonthlyPerformanceChart(this.state.dashboardProfitPerformanceChart).data}
                                            options={dashboardMonthlyPerformanceChart(this.state.dashboardProfitPerformanceChart).options}
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="stats">
                                        <i className="now-ui-icons arrows-1_refresh-69"/> Zojuist geupdate
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col xs={12} md={6}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Maandelijkse totalen</h5>
                                    <CardTitle tag="h4">Check-in</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Bar
                                            data={dashboardMonthlyPerformanceChart(this.state.dashboardProfitPerformanceChart).data}
                                            options={dashboardMonthlyPerformanceChart(this.state.dashboardProfitPerformanceChart).options}
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="stats">
                                        <i className="now-ui-icons arrows-1_refresh-69"/> Zojuist geupdate
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">dagelijkse totalen</h5>
                                    <CardTitle tag="h4">Omzet</CardTitle>
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className="btn-round btn-outline-default btn-icon"
                                            color="default"
                                        >
                                            <i className="now-ui-icons loader_gear"/>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>Netto omzet (Exclusief Servicekosten & BTW)</DropdownItem>
                                            <DropdownItem>Bruto omzet (Inclusief Servicekosten & BTW))</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={dashboardMonthlyPerformanceChart(this.state.dashboardProfitPerformanceChart).data}
                                            options={dashboardMonthlyPerformanceChart(this.state.dashboardProfitPerformanceChart).options}
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="stats">
                                        <i className="now-ui-icons arrows-1_refresh-69"/> Zojuist geupdate
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

Dashboard.propTypes = {
    getDailyOrderReport:   PropTypes.func.isRequired,
    getMonthlyOrderReport: PropTypes.func.isRequired,
    getYearlyOrderReport:  PropTypes.func.isRequired,
    userData:              PropTypes.object.isRequired,
    authData:              PropTypes.object.isRequired,
    eventData:             PropTypes.object.isRequired,
    orderData:             PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    userData:  state.userData,
    authData:  state.authData,
    eventData: state.eventData,
    orderData: state.orderData,
});

export default connect(mapStateToProps, {getDailyOrderReport, getMonthlyOrderReport, getYearlyOrderReport})(Dashboard);
