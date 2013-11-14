(function(root) { 
    root.getCharts = function(data) {        
        $.when(postMessagesSentReceivedChart(data), postMessagesSentServerChart(data)).done(function(sentReceivedStatus, sentServerStatus) {
            if (sentReceivedStatus != null && sentServerStatus != null) {
                getCharts().done(function(charts) {
                    $.each(charts, function(index, chart) {
                        var highChart = getChart(chart);
                        if (chart.Title === "Messages sent from clients and received by server pr. second") {
                            $("#messagesSentReceivedChart").highcharts(highChart);
                        } else if (chart.Title === "Messages sent from server pr. second") {
                            $("#messagesSentFromServerChart").highcharts(highChart);
                        }
                    });
                });
            }
        });
    };
    
    function postMessagesSentReceivedChart(data) {
        data.Type = "MessagesSentReceived";
        return $.post(loadTest.options.chartUrl, data);
    }
    
    function postMessagesSentServerChart(data) {
        data.Type = "MessagesSentServer";
        return $.post(loadTest.options.chartUrl, data);
    }
    
    function getCharts() {
        return $.get(loadTest.options.chartUrl);
    }
    
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

})(loadTest.charts = loadTest.charts || {});