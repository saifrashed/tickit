import React from "react";
// react plugin used to create charts
import {Bar, Line} from "react-chartjs-2";
// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import {dashboard24HoursPerformanceChart, dashboardAllProductsChart, dashboardPanelChart, dashboardShippedProductsChart} from "variables/charts.jsx";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <PanelHeader
                    size="lg"
                    content={
                        <Line
                            data={dashboardPanelChart.data}
                            options={dashboardPanelChart.options}
                        />
                    }
                />

                <div className="content">
                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Globale statistieken</h5>
                                    <CardTitle tag="h4">Bestellingen</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={dashboardShippedProductsChart.data}
                                            options={dashboardShippedProductsChart.options}
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
                        <Col xs={12} md={4}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Globale statistieken</h5>
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
                                            data={dashboardAllProductsChart.data}
                                            options={dashboardAllProductsChart.options}
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
                        <Col xs={12} md={4}>
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Globale statistieken</h5>
                                    <CardTitle tag="h4">Check-in</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Bar
                                            data={dashboard24HoursPerformanceChart.data}
                                            options={dashboard24HoursPerformanceChart.options}
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

export default Dashboard;
