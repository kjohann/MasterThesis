(function(root) {
    root.changeOnStart = function() {
        $("#running").show();
        $("#init").hide();
        $("#type").hide();
    };

    root.changeOnHarvestComplete = function() {
        $("#getCharts").show();
        $("#running").hide();
    };
})(loadTest.dom = loadTest.dom || {});