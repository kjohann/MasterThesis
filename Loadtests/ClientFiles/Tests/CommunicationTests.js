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

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[0][0].should.equal("initTest");

        functionsStub.restore();
    });
    it("start should call invoke with provided test as second argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[0][1].should.equal("echo");

        functionsStub.restore();
    });
    it("start should call invoke with total number of clients as third argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));

        setOpts(1, 1337, 1, 10);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[0][2].should.equal(10);

        functionsStub.restore();
    });
    it("start should call invoke with spacing as fourth argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        loadTest.options.spacing = 11;

        setOpts(1, 1337, 1);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[0][3].should.equal(11);

        functionsStub.restore();
    });
    it("start should call invoke with the current date in milliseconds as fifth argument when master client is present", function () {
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        var functionsStub = sinon.stub(loadTest.clientFunctions, "findClient");
        functionsStub.returns(getDeferred(true, client));
        var dateStub = sinon.stub(window, "Date");
        dateStub.returns({ getTime: function () { return 42; } });

        setOpts(1, 1337, 1);

        loadTest.communications.start("echo");

        fakeSocket.invokeArgs[0][4].should.equal(42);

        functionsStub.restore();
        dateStub.restore();
    });
    it("initTest should log an error if the provided test argument is neither 'echo' nor 'broadcast'", function() {
        var consoleMock = sinon.mock(window.console);
        consoleMock.expects("error").calledWithExactly("No such test!");
        resetOpts();

        loadTest.communications.initTest("NoSuchThing");

        consoleMock.verify();

        consoleMock.restore();
    });
    it("initTest should do work only once (indicated by a console.log) even if initTest is called several times", function() {
        var consoleMock = sinon.mock(window.console);
        consoleMock.expects("log").exactly(1);
        resetOpts();

        loadTest.communications.initTest("echo");

        consoleMock.verify();

        consoleMock.restore();
    });
    it("initTest should iterate over all clients and calls invoke on each clients socket", function() {
        this.clock = sinon.useFakeTimers();
        resetOpts();

        var fakeSocket1 = new FakeSocket();
        var client1 = new loadTest.models.Client(1, fakeSocket1);
        var fakeSocket2 = new FakeSocket();
        var client2 = new loadTest.models.Client(2, fakeSocket2);
        loadTest.options.clients.push(client1);
        loadTest.options.clients.push(client2);
        loadTest.options.numberOfMessages = 1;
        loadTest.options.messageInterval = 200;

        loadTest.communications.initTest("echo");
        this.clock.tick(10);
        loadTest.options.allComplete = true;

        client1.socket.invokeCalled.should.equal(1);
        client2.socket.invokeCalled.should.equal(1);

        this.clock.restore();
    });
    it("initTest should call invoke on the clients socket with the given test as first argument", function() {
        this.clock = sinon.useFakeTimers();
        resetOpts();

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);
        loadTest.options.numberOfMessages = 1;
        loadTest.options.messageInterval = 200;
        
        loadTest.communications.initTest("broadcast");
        this.clock.tick(10);
        loadTest.options.allComplete = true;

        client.socket.invokeArgs[0][0].should.equal("broadcast");

        this.clock.restore();
    });
    it("initTest should call invoke on the clients socket with a Message containing the clientId and the number of messages sent by the client", function() {
        this.clock = sinon.useFakeTimers();
        resetOpts();        

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);
        loadTest.options.numberOfMessages = 1;
        loadTest.options.messageInterval = 200;

        var msg = new loadTest.models.Message("1337", 1, 1);
        loadTest.communications.initTest("broadcast");
        this.clock.tick(10);
        loadTest.options.allComplete = true;

        
        client.socket.invokeArgs[0][1].ClientId.should.equal(msg.ClientId);
        client.socket.invokeArgs[0][1].MessageId.should.equal(msg.MessageId);

        this.clock.restore();
    });
    it("initTest should not send more messages pr. client than the number of messages specified", function () {
        this.clock = sinon.useFakeTimers();
        resetOpts();

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);
        loadTest.options.numberOfMessages = 5;
        loadTest.options.messageInterval = 200;

        loadTest.communications.initTest("broadcast");
        this.clock.tick(810);
        loadTest.options.allComplete = true;

        client.socket.invokeCalled.should.equal(5);

        this.clock.restore();
    });
    it("harvest should only call invoke once", function() {
        resetOpts();
        
        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        loadTest.communications.harvest();
        loadTest.communications.harvest();

        client.socket.invokeCalled.should.equal(1);
    });
    it("harvest should only call invoke once and only for the first client", function () {
        resetOpts();

        var fakeSocket1 = new FakeSocket();
        var client1 = new loadTest.models.Client(1, fakeSocket1);
        var fakeSocket2 = new FakeSocket();
        var client2 = new loadTest.models.Client(2, fakeSocket2);
        loadTest.options.clients.push(client1);
        loadTest.options.clients.push(client2);

        loadTest.communications.harvest();
        loadTest.communications.harvest();

        client2.socket.invokeCalled.should.equal(0);        
    });
    it("harvest should set allCompleted to true", function() {
        resetOpts();

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        loadTest.communications.harvest();

        loadTest.options.locks.allComplete.should.equal(true);
    });
    it("harvest should call invoke with 'getData' as first argument", function() {
        resetOpts();

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        loadTest.communications.harvest();

        client.socket.invokeArgs[0][0].should.equal("getData");
    });
    it("harvest should call invoke with the accumulated latencyEvents as second argument", function () {
        resetOpts();

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);
        loadTest.options.latencyEvents = [];
        loadTest.options.latencyEvents.push(42);
        loadTest.options.latencyEvents.push(1337);

        loadTest.communications.harvest();

        var expectedEvents = [];
        expectedEvents.push(42);
        expectedEvents.push(1337);

        client.socket.invokeArgs[0][1].LatencyData[0].should.equal(expectedEvents[0]);
        client.socket.invokeArgs[0][1].LatencyData[1].should.equal(expectedEvents[1]);
    });
    it("harvest should call invoke with numberOfClientsPrBrowser as third argument", function () {
        setOpts(1, 200, 5);

        var fakeSocket = new FakeSocket();
        var client = new loadTest.models.Client(1, fakeSocket);
        loadTest.options.clients.push(client);

        loadTest.communications.harvest();

        client.socket.invokeArgs[0][2].should.equal(5);
    });
});

function FakeSocket() {
    var self = this;
    self.bindCalled = 0;
    self.bindFirstArg = [];
    self.bindSecondArg = [];
    self.invokeCalled = 0;
    self.invokeArgs = [];
    self.startCalled = 0;
    self.bind = function(functionName, functionToCall) {
        self.bindCalled++;
        self.bindFirstArg[functionName] = functionName;
        self.bindSecondArg[functionName] = functionToCall;
    };
    self.invoke = function() {
        self.invokeCalled++;
        self.invokeArgs.push(Array.prototype.slice.call(arguments));
    };
    self.start = function() {
        self.startCalled++;
    };  
}

function setOpts(instanceId, connectionInterval, numberOfClientsPrBrowser) {
    loadTest.options.instanceId = instanceId;
    loadTest.options.connectionInterval = connectionInterval;
    loadTest.options.numberOfClientsPrBrowser = numberOfClientsPrBrowser;
    loadTest.options.numberOfClientsTotal = numberOfClientsPrBrowser * 10; //a random number, no significance
    resetOpts();       
}

function resetOpts() {
    loadTest.options.connectionsTried = 0;
    loadTest.options.clients = [];
    loadTest.options.locks.initLock = 0;
    loadTest.options.locks.harvestLock = 0;
    loadTest.options.locks.allComplete = false;
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
