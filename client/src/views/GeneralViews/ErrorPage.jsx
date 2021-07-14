import React from "react";
// reactstrap components
import {Card, CardHeader, Col, Row} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

class ErrorPage extends React.Component {
    render() {
        return (
            <>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Error 404 - page not found</h5>
                                    <p className="category">
                                        Created using Montserrat Font Family
                                    </p>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default ErrorPage;
