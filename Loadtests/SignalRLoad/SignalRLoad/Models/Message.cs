namespace SignalRLoad.Models
{
    public class Message
    {
        public long SentFromClient { get; set; }
        public long ReceivedAtServer { get; set; }
        public long ReceivedAtClient { get; set; }
        public string Payload { get; set; }
        public string ClientId { get; set; }
        public string MessageId { get; set; }
        public int Key { get; set; }
    }
}