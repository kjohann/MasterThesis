(function(root) {
    root.displayCharts = function(charts) {
        $.each(charts, function(index, chart) {
            var highChart = getChart(chart);
            if (chart.Title === "Messages sent from clients and received by server pr. second") {
                $("#messagesSentReceivedChart").highcharts(highChart);
            } else if (chart.Title === "Messages sent from server pr. second") {
                $("#messagesSentFromServerChart").highcharts(highChart);
            } else {
                $("#averageLatencyChart").highcharts(highChart);
            }
        });

        function getChart(chart) {
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
    }
})(merger.charts = merger.charts || {});
