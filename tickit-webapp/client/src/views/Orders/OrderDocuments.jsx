import {Document, Image, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer';
import React, {useMemo} from "react";

// resources
var QRCode = require('qrcode');
var Logo   = require("../../assets/img/tickit_logo.png");


/**
 * Ticket generator
 * @param props
 * @returns {*}
 * @constructor
 */
export const Ticket = (props) => {
    console.log("werkt");

    var QRurl = "";

    QRCode.toDataURL('Ticket systeem is zo goed als af', function (err, url) {
        QRurl = url;
    });

    return (
        <Document className={"tickitDoc__container"}>
            <Page>
                <View>
                    <Image src={Logo}/>
                </View>
                <View>
                    <Image src={QRurl}/>
                </View>
            </Page>

            <Page>
                <View>
                    <Image src={Logo}/>
                </View>
                <View>
                    <Image src={QRurl}/>
                </View>
            </Page>
        </Document>
    )
};


/**
 * Invoice generator
 * @param props
 * @returns {*}
 * @constructor
 */
export const Invoice = (props) => {
    return (
        <Document>
            <Page>
                <View>
                    <Text>Facturen</Text>
                </View>
            </Page>
        </Document>
    )
};


/**
 * Generates invoice pdf link
 * @param props
 * @returns {*}
 * @constructor
 */
export const GenerateInvoicePDF = (props) => {
    return useMemo(
        () => (
            <PDFDownloadLink document={<Invoice/>} fileName="Factuur.pdf">
                {({blob, url, loading, error}) => (loading ? (
                    <button className="btn-round btn-outline-success btn-icon btn btn-default disabled"
                            style={{margin: "0px 5px"}}>
                        <i className="now-ui-icons files_single-copy-04"></i>
                    </button>) : (<button className="btn-round btn-outline-success btn-icon btn btn-default"
                                          style={{margin: "0px 5px"}}>
                    <i className="now-ui-icons files_single-copy-04"></i>
                </button>))}

            </PDFDownloadLink>
        ), []);
};


/**
 * Generate ticket pdf link
 * @param props
 * @returns {*}
 * @constructor
 */
export const GenerateTicketPDF = (props) => {
    return useMemo(
        () => (
            <PDFDownloadLink document={<Ticket/>} fileName="Tickets.pdf">
                {({blob, url, loading, error}) => (loading ? (
                    <button className="btn-round btn-outline-success btn-icon btn btn-default disabled"
                            style={{margin: "0px 5px"}}>
                        <i className="now-ui-icons business_badge"></i>
                    </button>) : (<button className="btn-round btn-outline-success btn-icon btn btn-default"
                                          style={{margin: "0px 5px"}}>
                    <i className="now-ui-icons business_badge"></i>
                </button>))}

            </PDFDownloadLink>
        ), []);
};
