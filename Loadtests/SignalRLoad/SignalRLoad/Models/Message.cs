using System;

namespace SignalRLoad.Models
{
    public class Message
    {
        public DateTime SentFromClient { get; set; }
        public DateTime SentFromServer { get; set; }
        public DateTime ReceivedAtClient { get; set; }
        public string Payload { get; set; }
        public string MessageId { get; set; } //need?
        public string ClientId { get; set; }
    }
}