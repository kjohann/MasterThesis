using System;

namespace SignalRLoad.Models
{
    public class Message
    {
        public long SentFromClient { get; set; }
        public long SentFromServer { get; set; }
        public long ReceivedAtClient { get; set; }
        public string Payload { get; set; }
        public string ClientId { get; set; }
    }
}