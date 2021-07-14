import React, {Component} from "react";
// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

class Upgrade extends Component {
    render() {
        return (
            <>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Informatie</h5>
                                    <p className="paragraph">
                                        TickIT maakt gebruik van meerdere betaaldiensten die verschillende tarieven
                                        kunnen hanteren. Daarnaast hanteert TickIT ook zijn eigen tarief wat samen de
                                        servicekosten vormt van een ticket.
                                    </p>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th/>
                                            <th className="text-center">Free</th>
                                            <th className="text-center">Basic</th>
                                            <th className="text-center">Business</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Event size</td>
                                            <td className="text-center">
                                                <i className="fa fa-times text-danger"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mollie Payments</td>
                                            <td className="text-center">
                                                <i className="fa fa-times text-danger"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Check-in App</td>
                                            <td className="text-center">
                                                <i className="fa fa-times text-danger"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Transaction insight</td>
                                            <td className="text-center">
                                                <i className="fa fa-times text-danger"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Premium Support</td>
                                            <td className="text-center">
                                                <i className="fa fa-times text-danger"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-times text-danger"/>
                                            </td>
                                            <td className="text-center">
                                                <i className="fa fa-check text-success"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td/>
                                            <td className="text-center">Free</td>
                                            <td className="text-center">Just €19.99 P/M</td>
                                            <td className="text-center">Just €24.99 P/M</td>
                                        </tr>
                                        <tr>
                                            <td/>
                                            <td className="text-center">
                                                <Button
                                                    href="#"
                                                    color="default"
                                                    className="btn-round"
                                                >
                                                    Current Version
                                                </Button>
                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    target="_blank"
                                                    href="https://www.creative-tim.com/product/now-ui-dashboard-pro-react/?ref=nudr-upgrade"
                                                    color="info"
                                                    className="btn-round"
                                                >
                                                    Upgrade to Basic
                                                </Button>
                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    target="_blank"
                                                    href="https://www.creative-tim.com/product/now-ui-dashboard-pro-react/?ref=nudr-upgrade"
                                                    color="info"
                                                    className="btn-round"
                                                >
                                                    Upgrade to Business
                                                </Button>
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

export default Upgrade;
