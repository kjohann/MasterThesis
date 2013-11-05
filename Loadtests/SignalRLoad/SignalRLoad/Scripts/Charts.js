(function(root) { //will have other dependencies as well
    //bind methods from server that are needed to build charts
    root.getCharts = function(data) { //in charts somehow
        //get charts from api
        data.Type = "Messages"; 
        //var json = JSON.stringify(data);
        $.post(loadTest.chartUrl, data).done(function(chart) {
            console.log(chart);
        });
        //display charts
    };
})(loadTest.charts = loadTest.charts || {});