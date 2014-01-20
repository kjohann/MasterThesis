(function(root) {
    root.hideInitShowStart = function () {
        $("#connect").hide();
        $("#start").show();
    };

    root.showStart = function() {
        $("#init").show();
        $("#type").show();
        $("#msgInterval").show();
        $("#msgs").show();
    };

    root.changeOnStart = function () {
        $("#running").show();
        $("#init").hide();
        $("#type").hide();
        $("#msgInterval").hide();
        $("#msgs").hide();
        root.hideMasterPromotion();
    };

    root.changeOnHarvestComplete = function() {
        $("#getCharts").show();
    };

    root.showMasterPromotion = function() {
        $("#master").show();
    };

    root.hideMasterPromotion = function() {
        $("#master").hide();
    };
})(loadTest.dom = loadTest.dom || {});