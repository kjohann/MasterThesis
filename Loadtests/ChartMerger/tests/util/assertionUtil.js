var should = chai.should();

Array.prototype.shouldAllBeEqual = function (array2) {
    if(this.length != array2.length) {
        this.length.should.equal(array2.length);
        console.log("Different lengths");
        return;
    }

    for(var i = 0; i < this.length; i++) {
        if(this[i] != array2[i]) {
            console.log("Differ at index: " + i);
        }
        this[i].should.equal(array2[i]);
    }
}
