var should = chai.should();

describe("Models", function() {
    //The other dateFields are not relevant since they get overwritten
    it("Message should initialize SentFromClient to the current date in milliseconds", function () {
        var now = new Date();
        this.clock = sinon.useFakeTimers(now.getTime());

        var message = new loadTest.models.Message("1337", 1, 1);

        message.SentFromClient.should.equal(now.getTime());

        this.clock.restore();
    });
    it("Message should have a MessageId on the form c:<clientId>m:<messagesSentByThatClient>", function() {
        var message = new loadTest.models.Message("1337", 1, 1);

        message.MessageId.should.equal("c:1m:1");
    });
});