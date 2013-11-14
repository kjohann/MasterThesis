(function(options, charts, comm, functions) {
    $(function () {
        $("#header").append(options.frameWork);
        $("#getCharts").hide();
        $("#running").hide();
        $("#init").hide();
        $("#type").hide();
        $("#master").hide();
        $("#msgInterval").hide();
        $("#msgs").hide();
        
        $("#getCharts").click(function () {
            charts.getCharts(loadTest.data);
        });

        $("#connect").click(function() {
            options.connectionInterval = parseInt($("#connInterval").val());
            options.numberOfClientsTotal = parseInt($("#numberOfClients").val());
            options.numberOfClientsPrBrowser = parseInt($("#numberOfClients").val());
            comm.initConnection();
        });            

        $("#init").click(function () {
            var test = $("#type").val();
            options.messageInterval = parseInt($("#msgInterval").val());
            options.numberOfMessages = parseInt($("#msgs").val());
            comm.start(test);
        });

        $("#masterBtn").click(function() {            
            functions.promoteToMaster();
        });
    });
})(loadTest.options, loadTest.charts, loadTest.communications, loadTest.clientFunctions)