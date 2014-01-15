(function(root) {
    root.readFileAsJson = function(file) {
        var deferred = new $.Deferred();
        var reader = new FileReader();

        reader.onload = function(e) {
            try {
                var data = JSON.parse(reader.result);
                deferred.resolve(data);
            } catch(ex) {
                deferred.reject("File content not valid JSON");
            }
        }

        reader.readAsText(file);

        return deferred.promise();
    };
})(merger.util = merger.util || {});
