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
            }
        });
    }

    function getBrowserDataChart(chart) {
        return {
            title: {
                text: chart.Title,
                x: -20
            },
            xAxis: {
                categories: chart.XAxis
            },
            yAxis: {
                title: {
                    text: chart.YAxisTitle
                },
                plotLines: [{
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: mapSeries(chart)
        };
    }

    function getManualDataChart(chart) {
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: chart.title
            },
            xAxis: {
                categories: chart.xAxis
            },
            yAxis: {
                min: 0,
                title: {
                    text: chart.yAxisTitle
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
            series: chart.series
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
