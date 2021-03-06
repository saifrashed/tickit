/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// ##############################
// // // Function that converts a hex color number to a RGB color number
// #############################
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

// ##############################
// // // general variables for charts
// #############################

const chartColor = "#FFFFFF";

// General configuration for the charts with Line gradientStroke
const gradientChartOptionsConfiguration = {
    maintainAspectRatio: false,
    legend:              {
        display: false
    },
    tooltips:            {
        bodySpacing:  4,
        mode:         "nearest",
        intersect:    0,
        position:     "nearest",
        xPadding:     10,
        yPadding:     10,
        caretPadding: 10
    },
    responsive:          1,
    scales:              {
        yAxes: [
            {
                display:   0,
                ticks:     {
                    display:       false,
                    maxTicksLimit: 7
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks:     false,
                    display:       false,
                    drawBorder:    false
                }
            }
        ],
        xAxes: [
            {
                display:   0,
                ticks:     {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks:     false,
                    display:       false,
                    drawBorder:    false
                }
            }
        ]
    },
    layout:              {
        padding: {left: 0, right: 0, top: 15, bottom: 15}
    }
};

var gradientChartOptionsConfigurationWithNumbersAndGrid = {
    maintainAspectRatio: false,
    legend:              {
        display: false
    },
    tooltips:            {
        bodySpacing:  4,
        mode:         "nearest",
        intersect:    0,
        position:     "nearest",
        xPadding:     10,
        yPadding:     10,
        caretPadding: 10
    },
    responsive:          1,
    scales:              {
        yAxes: [
            {
                gridLines: {
                    zeroLineColor: "transparent",
                    drawBorder:    false
                },
                ticks:     {
                    maxTicksLimit: 7
                }
            }
        ],
        xAxes: [
            {
                display:   0,
                ticks:     {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks:     false,
                    display:       false,
                    drawBorder:    false
                }
            }
        ]
    },
    layout:              {
        padding: {left: 0, right: 0, top: 15, bottom: 15}
    }
};

// ##############################
// // // Dashboard view - Panel chart
// #############################

const dashboardPanelChart = data => {
    return {
        data:    canvas => {
            const ctx          = canvas.getContext("2d");
            var chartColor     = "#FFFFFF";
            var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
            gradientStroke.addColorStop(0, "#80b6f4");
            gradientStroke.addColorStop(1, chartColor);
            var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");

            return {
                labels:   [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OKT",
                    "NOV",
                    "DEC"
                ],
                datasets: [
                    {
                        label:                     "Bestellingen",
                        borderColor:               chartColor,
                        pointBorderColor:          chartColor,
                        pointBackgroundColor:      "#2c2c2c",
                        pointHoverBackgroundColor: "#2c2c2c",
                        pointHoverBorderColor:     chartColor,
                        pointBorderWidth:          1,
                        pointHoverRadius:          7,
                        pointHoverBorderWidth:     2,
                        pointRadius:               5,
                        fill:                      true,
                        backgroundColor:           gradientFill,
                        borderWidth:               2,
                        data:                      data
                    }
                ]
            };
        },
        options: {
            layout:              {
                padding: {
                    left:   20,
                    right:  20,
                    top:    0,
                    bottom: 0
                }
            },
            maintainAspectRatio: false,
            tooltips:            {
                backgroundColor: "#fff",
                titleFontColor:  "#333",
                bodyFontColor:   "#666",
                bodySpacing:     4,
                xPadding:        12,
                mode:            "nearest",
                intersect:       0,
                position:        "nearest"
            },
            legend:              {
                position:  "bottom",
                fillStyle: "#FFF",
                display:   false
            },
            scales:              {
                yAxes: [
                    {
                        ticks:     {
                            fontColor:     "rgba(255,255,255,0.4)",
                            fontStyle:     "bold",
                            beginAtZero:   true,
                            maxTicksLimit: 5,
                            padding:       10
                        },
                        gridLines: {
                            drawTicks:     true,
                            drawBorder:    false,
                            display:       true,
                            color:         "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent"
                        }
                    }
                ],
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                            color:   "rgba(255,255,255,0.1)"
                        },
                        ticks:     {
                            padding:   10,
                            fontColor: "rgba(255,255,255,0.4)",
                            fontStyle: "bold"
                        }
                    }
                ]
            }
        }
    }
};

// ##############################
// // // Dashboard view - Shipped Products - Card
// #############################
//
// const dashboardOrdersChart = data => {
//     return {
//     data:    canvas => {
//         var ctx            = canvas.getContext("2d");
//         var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
//         gradientStroke.addColorStop(0, "#80b6f4");
//         gradientStroke.addColorStop(1, chartColor);
//         var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
//         gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
//         gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
//         return {
//             labels:   [
//                 "Jan",
//                 "Feb",
//                 "Mar",
//                 "Apr",
//                 "May",
//                 "Jun",
//                 "Jul",
//                 "Aug",
//                 "Sep",
//                 "Oct",
//                 "Nov",
//                 "Dec"
//             ],
//             datasets: [
//                 {
//                     label:                 "Active Users",
//                     borderColor:           "#f96332",
//                     pointBorderColor:      "#FFF",
//                     pointBackgroundColor:  "#f96332",
//                     pointBorderWidth:      2,
//                     pointHoverRadius:      4,
//                     pointHoverBorderWidth: 1,
//                     pointRadius:           4,
//                     fill:                  true,
//                     backgroundColor:       gradientFill,
//                     borderWidth:           2,
//                     data:                  data
//                 }
//             ]
//         };
//     },
//     options: gradientChartOptionsConfiguration
// }};

// ##############################
// // // Dashboard view - All Products - Card
// #############################
//
// const dashboardAllProductsChart = {
//     data:    canvas => {
//         var ctx            = canvas.getContext("2d");
//         var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
//         gradientStroke.addColorStop(0, "#18ce0f");
//         gradientStroke.addColorStop(1, chartColor);
//         var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
//         gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
//         gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
//         return {
//             labels:   ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
//             datasets: [
//                 {
//                     label:                 "Email Stats",
//                     borderColor:           "#18ce0f",
//                     pointBorderColor:      "#FFF",
//                     pointBackgroundColor:  "#18ce0f",
//                     pointBorderWidth:      2,
//                     pointHoverRadius:      4,
//                     pointHoverBorderWidth: 1,
//                     pointRadius:           4,
//                     fill:                  true,
//                     backgroundColor:       gradientFill,
//                     borderWidth:           2,
//                     data:                  [10, 10, 10, 10, 10, 10, 10, 10]
//                 }
//             ]
//         };
//     },
//     options: gradientChartOptionsConfigurationWithNumbersAndGrid
// };

// ##############################
// // // // Chart - Monthly (12 month)
// // #############################

const dashboardMonthlyPerformanceChart = (data = [0,0,0,0,0,0,0,0,0,0]) => {

    return {
        data:    canvas => {
            var ctx          = canvas.getContext("2d");
            var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.6));
            return {
                labels:   [
                    "Januari",
                    "Februari",
                    "Maart",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Augustus",
                    "September",
                    "Oktober",
                    "November",
                    "December"
                ],
                datasets: [
                    {
                        label:                 "Aantal (EUR)",
                        backgroundColor:       gradientFill,
                        borderColor:           "#2CA8FF",
                        pointBorderColor:      "#FFF",
                        pointBackgroundColor:  "#2CA8FF",
                        pointBorderWidth:      2,
                        pointHoverRadius:      4,
                        pointHoverBorderWidth: 1,
                        pointRadius:           4,
                        fill:                  true,
                        borderWidth:           1,
                        data:                  data
                    }
                ]
            };
        },
        options: {
            maintainAspectRatio: false,
            legend:              {
                display: false
            },
            tooltips:            {
                bodySpacing:  4,
                mode:         "nearest",
                intersect:    0,
                position:     "nearest",
                xPadding:     10,
                yPadding:     10,
                caretPadding: 10
            },
            responsive:          1,
            scales:              {
                yAxes: [
                    {
                        ticks:     {
                            maxTicksLimit: 7
                        },
                        gridLines: {
                            zeroLineColor: "transparent",
                            drawBorder:    false
                        }
                    }
                ],
                xAxes: [
                    {
                        display:   0,
                        ticks:     {
                            display: false
                        },
                        gridLines: {
                            zeroLineColor: "transparent",
                            drawTicks:     false,
                            display:       false,
                            drawBorder:    false
                        }
                    }
                ]
            },
            layout:              {
                padding: {left: 0, right: 0, top: 15, bottom: 15}
            }
        }
    }
};

// ##############################
// // // // Chart - Daily (24 HOUR)
// // #############################

const dashboardDailyPerformanceChart = (data = [0,0,0,0,0,0,0,0,0,0]) => {

    return {
        data:    canvas => {
            var ctx          = canvas.getContext("2d");
            var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.6));
            return {
                labels:   [
                    "00:00",
                    "01:00",
                    "02:00",
                    "03:00",
                    "04:00",
                    "05:00",
                    "06:00",
                    "07:00",
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00",
                    "22:00",
                    "23:00",
                ],
                datasets: [
                    {
                        label:                 "Aantal",
                        backgroundColor:       gradientFill,
                        borderColor:           "#2CA8FF",
                        pointBorderColor:      "#FFF",
                        pointBackgroundColor:  "#2CA8FF",
                        pointBorderWidth:      2,
                        pointHoverRadius:      4,
                        pointHoverBorderWidth: 1,
                        pointRadius:           4,
                        fill:                  true,
                        borderWidth:           1,
                        data:                  data
                    }
                ]
            };
        },
        options: {
            maintainAspectRatio: false,
            legend:              {
                display: false
            },
            tooltips:            {
                bodySpacing:  4,
                mode:         "nearest",
                intersect:    0,
                position:     "nearest",
                xPadding:     10,
                yPadding:     10,
                caretPadding: 10
            },
            responsive:          1,
            scales:              {
                yAxes: [
                    {
                        ticks:     {
                            maxTicksLimit: 7
                        },
                        gridLines: {
                            zeroLineColor: "transparent",
                            drawBorder:    false
                        }
                    }
                ],
                xAxes: [
                    {
                        display:   0,
                        ticks:     {
                            display: false
                        },
                        gridLines: {
                            zeroLineColor: "transparent",
                            drawTicks:     false,
                            display:       false,
                            drawBorder:    false
                        }
                    }
                ]
            },
            layout:              {
                padding: {left: 0, right: 0, top: 15, bottom: 15}
            }
        }
    }
};

module.exports = {
    dashboardPanelChart, // Chart for Dashboard view - Will be rendered in panel
    dashboardMonthlyPerformanceChart, // Chart for Dashboard view - 24 Hours Performance Card
    dashboardDailyPerformanceChart
};
