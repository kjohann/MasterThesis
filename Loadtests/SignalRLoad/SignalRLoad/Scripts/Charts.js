(function(root) { 
    root.getCharts = function(data) {        
        data.Type = "Messages";
        console.log(data);
        $.post(loadTest.options.chartUrl, data).done(function(chart) {
            $("#messagesChart").highcharts(getChart(chart));
        });
    };
    
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