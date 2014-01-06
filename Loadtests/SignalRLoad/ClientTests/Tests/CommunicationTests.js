var should = chai.should();

describe("Communication", function() {
    it("initConnection should create the specified amount of sockets with the set interval", function() {
        this.clock = sinon.useFakeTimers();

        var socketMock = sinon.mock(loadTest.socket);
        var socketExpectation = socketMock.expects("SocketInstance").exactly(5);
        socketExpectation.returns(new FakeSocket());

        setOpts(1, 200, 5);

        loadTest.communications.initConnection();
        this.clock.tick(1010); // enough time for 6 calls

        loadTest.options.connectionsTried.should.equal(5);
        socketMock.verify();

        this.clock.restore();
        socketMock.restore();
    });
    it("initConnection should push Clients to an array in the options object", function() {
        this.clock = sinon.useFakeTimers();

        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        socketStub.returns(new FakeSocket());

        setOpts(1, 200, 5);
        
        loadTest.communications.initConnection();
        this.clock.tick(1010); 

        loadTest.options.clients.length.should.equal(5);
        
        this.clock.restore();
        socketStub.restore();
    });
    it("initConnection should call start on the socketInstance once for each client", function() {
        this.clock = sinon.useFakeTimers();
        
        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        var fakeSocket = new FakeSocket();
        socketStub.returns(fakeSocket);
        
        setOpts(1, 200, 5);

        loadTest.communications.initConnection();

        fakeSocket.startCalled.should.equal(1);
        for (var i = 1; i < 5; i++) {
            this.clock.tick(201);
            fakeSocket.startCalled.should.equal(i + 1);
        }
        
        this.clock.restore();
        socketStub.restore();
    });
    it("initConnection should assign client Ids starting at instanceId, incrementing by one for each", function() {
        this.clock = sinon.useFakeTimers();

        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        socketStub.returns(new FakeSocket());

        setOpts(1, 200, 5);

        loadTest.communications.initConnection();
        this.clock.tick(1010);

        loadTest.options.clients[0].clientId.should.equal(1);
        loadTest.options.clients[1].clientId.should.equal(2);
        loadTest.options.clients[2].clientId.should.equal(3);
        loadTest.options.clients[3].clientId.should.equal(4);
        loadTest.options.clients[4].clientId.should.equal(5);

        this.clock.restore();
        socketStub.restore();
    });
    it("initConnection should bind the initTest function to the initTest function in loadTest.communication", function() {
        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        var fakeSocket = new FakeSocket();
        socketStub.returns(fakeSocket);

        setOpts(1, 1, 1);

        loadTest.communications.initConnection();

        fakeSocket.bindFirstArg["initTest"].should.equal("initTest");
        fakeSocket.bindSecondArg["initTest"].should.equal(loadTest.communications.initTest);

        socketStub.restore();
    });
    it("initConnection should bind the receiveMessage function to the receiveMessage function in loadTest.clientFunctions", function () {
        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        var fakeSocket = new FakeSocket();
        socketStub.returns(fakeSocket);

        setOpts(1, 1, 1);

        loadTest.communications.initConnection();

        fakeSocket.bindFirstArg["receiveMessage"].should.equal("receiveMessage");
        fakeSocket.bindSecondArg["receiveMessage"].should.equal(loadTest.clientFunctions.receiveMessage);

        socketStub.restore();
    });
    it("initConnection should bind the harvest function to the harvest function in loadTest.communication", function () {
        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        var fakeSocket = new FakeSocket();
        socketStub.returns(fakeSocket);

        setOpts(1, 1, 1);

        loadTest.communications.initConnection();

        fakeSocket.bindFirstArg["harvest"].should.equal("harvest");
        fakeSocket.bindSecondArg["harvest"].should.equal(loadTest.communications.harvest);

        socketStub.restore();
    });
    it("initConnection should bind the harvestComplete function to the harvestComplete function in loadTest.clientFunctions", function () {
        var socketStub = sinon.stub(loadTest.socket, "SocketInstance");
        var fakeSocket = new FakeSocket();
        socketStub.returns(fakeSocket);

        setOpts(1, 1, 1);

        loadTest.communications.initConnection();

        fakeSocket.bindFirstArg["harvestComplete"].should.equal("harvestComplete");
        fakeSocket.bindSecondArg["harvestComplete"].should.equal(loadTest.clientFunctions.harvestComplete);

        socketStub.restore();
    });
    it("start should not call invoke if no master client is present", function() {
        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(false, { message: "error" }));

        resetOpts();
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        loadTest.communications.start("echo");

        fakeSocket.invokeCalled.should.equal(0);

        functionsStub.restore();
    });
    it("start should call invoke with 'initTest' as first argument when master client is present", function() {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);
        
        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        var domStub = sinon.stub(loadTest.dom, "changeOnStart");

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[0].should.equal("initTest");

        functionsStub.restore();
        domStub.restore();
    });
    it("start should call invoke with provided test as second argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        var domStub = sinon.stub(loadTest.dom, "changeOnStart");

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[1].should.equal("echo");

        functionsStub.restore();
        domStub.restore();
    });
    it("start should call invoke with total number of clients as third argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        var domStub = sinon.stub(loadTest.dom, "changeOnStart");

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[2].should.equal(10);

        functionsStub.restore();
        domStub.restore();
    });
    it("start should call invoke with spacing as fourth argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        var domStub = sinon.stub(loadTest.dom, "changeOnStart");

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[3].should.equal(10);

        functionsStub.restore();
        domStub.restore();
    });
    it("start should call invoke with the current date in milliseconds as fifth argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        var domStub = sinon.stub(loadTest.dom, "changeOnStart");
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({ getTime: function () { return 42; } });

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[4].should.equal(42);

        functionsStub.restore();
        domStub.restore();
    });
});

function FakeSocket() {
    var self = this;
    self.bindCalled = 0;
    self.bindFirstArg = [];
    self.bindSecondArg = [];
    self.invokeCalled = 0;
    self.startCalled = 0;
    self.bind = function(functionName, functionToCall) {
        self.bindCalled++;
        self.bindFirstArg[functionName] = functionName;
        self.bindSecondArg[functionName] = functionToCall;
    };
    self.invoke = function() {
        self.invokeCalled++;
        self.invokeArgs = Array.prototype.slice.call(arguments);
    };
    self.start = function() {
        self.startCalled++;
    };  
}

function setOpts(instanceId, connectionInterval, numberOfClientsPrBrowser, spacing) {
    loadTest.options.instanceId = instanceId;
    loadTest.options.connectionInterval = connectionInterval;
    loadTest.options.numberOfClientsPrBrowser = numberOfClientsPrBrowser;
    loadTest.options.numberOfClientsTotal = numberOfClientsPrBrowser * 10; //a random number, no significance
    resetOpts();
    
    if (spacing) {
        loadTest.options.spacing = spacing;
    }
}

function resetOpts() {
    loadTest.options.connectionsTried = 0;
    loadTest.options.clients = [];
}

function getDeferred(resolve, withObj) {
    var deferred = new $.Deferred();
    if (resolve) {
        deferred.resolve(withObj);
    } else {
        deferred.reject(withObj);
    }
    return deferred.promise();
}
