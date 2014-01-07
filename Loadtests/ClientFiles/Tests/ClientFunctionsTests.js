var should = chai.should();

describe("Clientfunctions", function () {
    it("recieveMessage should register received message in the corresponding clients messages array", function() {
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({getTime: function () { return 0; }});

        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(1, null));
        var message = new loadTest.models.Message("1337", 1, 1);
        dateStub.returns({ getTime: function () { return 42; } });

        loadTest.clientFunctions.receiveMessage(message);

        loadTest.options.clients[0].messages[message.MessageId].MessageId.should.equal(message.MessageId);

        dateStub.restore();
    });
    it("receiveMessage should add receive time for the message", function() {
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({ getTime: function () { return 0; } });

        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(1, null));
        var message = new loadTest.models.Message("1337", 1, 1);
        dateStub.returns({ getTime: function () { return 42; } });

        loadTest.clientFunctions.receiveMessage(message);

        message.ReceivedAtClient.should.equal(42);
        
        dateStub.restore();
    });
    it("receiveMessage should only add a message once, meaning that it registers latency only once", function() {
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({ getTime: function () { return 0; } });
        var latencyMock = sinon.mock(loadTest.clientFunctions);
        latencyMock.expects("registerLatency").atMost(1);

        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(1, null));
        var message = new loadTest.models.Message("1337", 1, 1);
        dateStub.returns({ getTime: function () { return 42; } });

        loadTest.clientFunctions.receiveMessage(message);
        loadTest.clientFunctions.receiveMessage(message);

        latencyMock.verify();

        latencyMock.restore();
        dateStub.restore();
    });
    it("receiveMessage should add new latency entry in array if the index indicated by message.Key is not defined", function() {
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({ getTime: function () { return 0; } });

        loadTest.options.clients = [];
        loadTest.options.latencyEvents = [];
        loadTest.options.clients.push(new loadTest.models.Client(1, null));
        var message = new loadTest.models.Message("1337", 1, 1);
        message.Key = 0;
        dateStub.returns({ getTime: function () { return 42; } });

        loadTest.clientFunctions.receiveMessage(message);

        loadTest.options.latencyEvents[0].should.equal(42);

        dateStub.restore();
    });
    it("receiveMessage should increment accumulated latency with the latency for the current message", function () {
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({ getTime: function () { return 0; } });

        loadTest.options.clients = [];
        loadTest.options.latencyEvents = [];
        loadTest.options.latencyEvents.push(42)
        loadTest.options.clients.push(new loadTest.models.Client(1, null));
        var message = new loadTest.models.Message("1337", 1, 1);
        message.Key = 0;
        dateStub.returns({ getTime: function () { return 42; } });

        loadTest.clientFunctions.receiveMessage(message);

        loadTest.options.latencyEvents[0].should.equal(84);

        dateStub.restore();
    });
    it("harvestComplete should set masterId to 0 if it is not 0 already", function () {
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
    it("promoteToMaster should promote the client with same id as the instanceId to master", function() {
        var domStub1 = sinon.stub(loadTest.dom, "hideMasterPromotion");
        var domStub2 = sinon.stub(loadTest.dom, "showStart");
        loadTest.options.instanceId = 1;

        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(2, null));
        loadTest.options.clients.push(new loadTest.models.Client(1, null));

        loadTest.clientFunctions.promoteToMaster();

        loadTest.options.masterId.should.equal(1);

        domStub1.restore();
        domStub2.restore();
    });
    it("promoteToMaster should only promote one client to master", function() {
        var domMock = sinon.mock(loadTest.dom);
        domMock.expects("showStart").atMost(1);
        loadTest.options.instanceId = 1;

        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(2, null));
        loadTest.options.clients.push(new loadTest.models.Client(1, null));

        loadTest.clientFunctions.promoteToMaster();

        domMock.verify();

        domMock.restore();
    });
    it("promotoToMaster should not promote if no client matches the instanceId", function() {
        var domMock = sinon.mock(loadTest.dom);
        domMock.expects("showStart").atMost(0);
        loadTest.options.instanceId = 5;

        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(2, null));
        loadTest.options.clients.push(new loadTest.models.Client(1, null));

        loadTest.clientFunctions.promoteToMaster();

        domMock.verify();

        domMock.restore();
    });
    it("getMessages moves all messages from the associative array of a client to an indexed array", function() {
        var client = new loadTest.models.Client(1, null);
        client.messages["c:1m:1"] = new loadTest.models.Message("1337", 1, 1);
        client.messages["c:1m:2"] = new loadTest.models.Message("1337", 1, 2);

        var messages = loadTest.clientFunctions.getMessages(client);

        messages[0].MessageId.should.equal("c:1m:1");
        messages[1].MessageId.should.equal("c:1m:2");
    });
    it("findClient should resolve a promise with the found client if successful", function(done) {
        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(2, null));
        loadTest.options.clients.push(new loadTest.models.Client(1, null));

        loadTest.clientFunctions.findClient(1).done(function(client) {
            client.clientId.should.equal(1);
            done();
        });

    });
    it("findClient should reject a promise with a message stating that the client wasn't found if unsuccessful", function (done) {
        loadTest.options.clients = [];
        loadTest.options.clients.push(new loadTest.models.Client(2, null));
        loadTest.options.clients.push(new loadTest.models.Client(1, null));

        loadTest.clientFunctions.findClient(1337).fail(function (msgObj) {
            msgObj.message.should.equal("Couldn't find client with id: 1337");
            done();
        });

    });
});