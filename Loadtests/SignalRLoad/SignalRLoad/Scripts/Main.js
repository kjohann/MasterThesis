(function(options, charts, comm, functions) {
    $(function () {
        $("#header").append(options.frameWork);
        $("#getCharts").hide();
        
        $("#getCharts").click(function () {
            charts.getCharts(loadTest.data);
        });

        $("#connect").click(function() {
            options.chartUrl = getValue("#chartAPIInput");
            options.transport = getValue("#transports");
            options.spacing = getValueAsInt("#spacing");
            options.instanceId = getValueAsInt("#instanceId");
            options.numberOfClientsTotal = getValueAsInt("#totalClients");
            options.numberOfClientsPrBrowser = getValueAsInt("#clientsBrowser");
            options.connectionInterval = getValueAsInt("#connInterval");
            options.numberOfMessages = getValueAsInt("#msgs");
            options.messageInterval = getValueAsInt("#msgInterval");
            options.testType = $("#type").val();            
            
            if ($("#masterBtn")[0].checked) {
                options.masterId = options.instanceId;
            }
            comm.initConnection();
        });            

        $("#start").click(function () {            
            if (options.masterId !== 0) {
                functions.promoteToMaster();
            }
            comm.start(options.testType);
        });
        
    });
    
    function getValueAsInt(id) {
        return parseInt($(id).val());
    }
    
    function getValue(id) {
        return $(id).val();
    }
})(loadTest.options, loadTest.charts, loadTest.communications, loadTest.clientFunctions)