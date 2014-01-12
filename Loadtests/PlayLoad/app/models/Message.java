package models;

public class Message {
	public long SentFromClient;
    public long ReceivedAtServer;
    public long ReceivedAtClient;
    public String Payload;
    public String ClientId;
    public String MessageId;
    public int Key;
    
    public Message () {}
    
    public Message(long SentFromClient, long ReceivedAtServer, 
    		String Payload, String ClientId, String MessageId) {
    	
    	this.SentFromClient = SentFromClient;
    	this.ReceivedAtServer = ReceivedAtServer;
    	this.ReceivedAtClient = 0;
        this.Payload = Payload;
        this.ClientId = ClientId;
        this.MessageId = MessageId;
        this.Key = 0;
    }    
	
	public boolean equals(Message msg) {
		return this.SentFromClient == msg.SentFromClient &&
				this.ReceivedAtClient == msg.ReceivedAtClient &&
				this.ReceivedAtServer == msg.ReceivedAtServer &&
				this.Payload.equals(msg.Payload) &&
				this.ClientId.equals(msg.ClientId) &&
				this.MessageId.equals(msg.MessageId) &&
				this.Key == msg.Key;
	}
}
