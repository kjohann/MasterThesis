(function(root) {
    root.displayBrowserDataCharts = function(charts) {
        $.each(charts, function(index, chart) {
            var highChart = getBrowserDataChart(chart);
            if (chart.Title === "Messages sent from clients and received by server pr. second") {
                $("#messagesSentReceivedChart").highcharts(highChart);
            } else if (chart.Title === "Messages sent from server pr. second") {
                $("#messagesSentFromServerChart").highcharts(highChart);
            } else {
                $("#averageLatencyChart").highcharts(highChart);
            }
        });
    }

    root.displayManualDataChart = function(charts) {
        $.each(charts, function(index, chart) {
            var highChart = getManualDataChart(chart);
            if(chart.title === "Bytes sent/received") {
                $("#bytesSentReceivedChart").highcharts(highChart);
            } else if(chart.title === "Median processor usage") {
                $("#peakProcessorChart").highcharts(highChart);
            } else if(chart.title === "Max memory consumption") {
                $("#maxMemoryConsumtionChart").highcharts(highChart);
            } else {
                $("#totalAvgLatencyChart").highcharts(highChart);
            }
        });
    }

    function getBrowserDataChart(chart) {
        return {
            colors: [ '#2f7ed8',
                '#0d233a',
                '#8bbc21',
                '#910000',
                '#00C78C',
                '#838B83',
                '#f28f43',
                '#EEEE00',
                '#FF00FF',
                '#FF0000'
            ],
            title: {
                text: chart.Title,
                x: -20,
                style: {
                    fontSize: '30px'
                }
            },
            xAxis: {
                title: {
                    text: 'Seconds',
                    style: {
                        fontSize: '16px'
                    }
                },
                categories: chart.XAxis,
                labels: {
                    style: {
                        fontSize:'20px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: chart.YAxisTitle,
                    style: {
                        fontSize: '16px'
                    }
                },
                plotLines: [{
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    style: {
                        fontSize:'20px'
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                itemStyle: {
                    fontSize: '26px'
                }
            },
            series: mapSeries(chart),
            exporting: {
                filename: chart.Title,
                sourceHeight: 550,
                sourceWidth: 1337
            }

        };
    }

    function getManualDataChart(chart) {
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: chart.title,
                style: {
                    fontSize: '24px'
                }
            },
            xAxis: {
                categories: chart.xAxis,
                labels: {
                    style: {
                        fontSize:'20px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: chart.yAxisTitle,
                    style: {
                        fontSize: '16px'
                    }
                },
                labels: {
                    style: {
                        fontSize:'20px'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}' + chart.unit + '</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: chart.series,
            legend: {
                borderWidth: 0,
                itemStyle: {
                    fontSize: '26px'
                }
            },
            exporting: {
                filename: chart.title,
                sourceHeight: 550,
                sourceWidth: 1337
            }
        };
    }

    function mapSeries(chart) {
        return $.map(chart.Series, function (value, index) {
            return {
                data: $.map(value.Data, function (val, i) {
                    return parseFloat(val);
                }),
                name: value.Name
            };
        });
    }

})(merger.charts = merger.charts || {});
