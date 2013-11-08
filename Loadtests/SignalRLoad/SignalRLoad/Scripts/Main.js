(function(options, charts, comm) {
    $(function () {
        $("#header").append(options.frameWork);
        $("#getCharts").hide();
        $("#running").hide();

        $("#getCharts").click(function () {
            charts.getCharts(loadTest.data);
        });

        $("#init").click(function () {
            var test = $("#type").val();
            comm.start(test);
        });

        comm.initConnection();
    });
})(loadTest.options, loadTest.charts, loadTest.communications)