(function(root) {
    root.hideInitShowStart = function () {
        $("#connect").hide();
        $("#start").show();
    };

    root.changeOnHarvestComplete = function() {
        $("#getCharts").show();
    };
})(loadTest.dom = loadTest.dom || {});