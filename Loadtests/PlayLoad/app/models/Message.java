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
    
    public long getSentFromClient() {
		return SentFromClient;
	}

	public void setSentFromClient(long sentFromClient) {
		SentFromClient = sentFromClient;
	}

	public long getReceivedAtServer() {
		return ReceivedAtServer;
	}

	public void setReceivedAtServer(long receivedAtServer) {
		ReceivedAtServer = receivedAtServer;
	}

	public long getReceivedAtClient() {
		return ReceivedAtClient;
	}

	public void setReceivedAtClient(long receivedAtClient) {
		ReceivedAtClient = receivedAtClient;
	}

	public String getPayload() {
		return Payload;
	}

	public void setPayload(String payload) {
		Payload = payload;
	}

	public String getClientId() {
		return ClientId;
	}

	public void setClientId(String clientId) {
		ClientId = clientId;
	}

	public String getMessageId() {
		return MessageId;
	}

	public void setMessageId(String messageId) {
		MessageId = messageId;
	}

	public int getKey() {
		return Key;
	}

	public void setKey(int key) {
		Key = key;
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
