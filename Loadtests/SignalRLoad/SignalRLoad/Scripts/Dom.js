(function(root) {
    root.changeOnStart = function() {
        $("#running").show();
        $("#init").hide();
        $("#type").hide();
        root.hideMasterPromotion();
    };

    root.changeOnHarvestComplete = function() {
        $("#getCharts").show();
        $("#running").hide();
    };

    root.hideMasterPromotion = function() {
        $("#master").hide();
    };
})(loadTest.dom = loadTest.dom || {});