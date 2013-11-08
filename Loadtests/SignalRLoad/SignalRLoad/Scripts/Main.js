(function(options, charts, comm, functions) {
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

        $("#masterBtn").click(function() {
            var id = $("#masterTxt").val();
            if (!id) {
                alert("Provide an id!");
                return;
            }

            functions.promoteToMaster(id);
        });

        comm.initConnection();
    });
})(loadTest.options, loadTest.charts, loadTest.communications, loadTest.clientFunctions)