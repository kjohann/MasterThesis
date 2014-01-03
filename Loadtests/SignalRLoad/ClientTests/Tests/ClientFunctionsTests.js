var should = chai.should();

describe("Clientfunctions", function () {
    it("harvestComplete should set masterId to 0 if it is not 0 already", function() {
        var domStub = sinon.stub(loadTest.dom, "changeOnHarvestComplete");
        loadTest.options.masterId = 1;
        var dummyData = { data: "Testdata" };

        loadTest.clientFunctions.harvestComplete(dummyData);

        loadTest.options.masterId.should.equal(0);
        domStub.restore();
    });
    it("harvestComplete should attach incoming data to loadTest object", function() {
        var domStub = sinon.stub(loadTest.dom, "changeOnHarvestComplete");
        loadTest.options.masterId = 1;
        var dummyData = { data: "Testdata" };

        loadTest.clientFunctions.harvestComplete(dummyData);

        loadTest.data.should.equal(dummyData);
        domStub.restore();
    });
    it("harvestComplete should not do any work if masterId is 0", function() {
        var domMock = sinon.mock(loadTest.dom);
        domMock.expects("changeOnHarvestComplete").atMost(0);
        
        loadTest.options.masterId = 0;
        var dummyData = { data: "Testdata" };
        
        loadTest.clientFunctions.harvestComplete(dummyData);

        domMock.verify();
        domMock.restore();

    });
});