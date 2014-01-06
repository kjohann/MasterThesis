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
    };
    self.start = function() {
        self.startCalled++;
    };  
}

function setOpts(instanceId, connectionInterval, numberOfClientsPrBrowser) {
    loadTest.options.instanceId = instanceId;
    loadTest.options.connectionInterval = connectionInterval;
    loadTest.options.connectionsTried = 0;
    loadTest.options.clients = [];
    loadTest.options.numberOfClientsPrBrowser = numberOfClientsPrBrowser;
}
