/**
 * Loading screen components
 */


import React from "react";

import PanelHeader from "../PanelHeader/PanelHeader.jsx";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";


export const LoadingScreen = (title, description, message) => {
    return (
        <>
            <PanelHeader size="sm"/>
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Events</CardTitle>
                                <p className="category"> All ur planned events.</p>
                            </CardHeader>
                            <CardBody>
                                <p>No events found</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const LoadingScreenSpinner = () => {
    return (
        <>
            <PanelHeader size="sm"/>
            <div className="content">
                <Row>
                    <Col xs={12} style={{textAlign: "center"}}>
                        <Card>
                            <CardBody>
                                <ClipLoader
                                    size={150}
                                    color={"#f96332"}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};
