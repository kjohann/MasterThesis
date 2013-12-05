using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class ChartPostModel
    {
        public List<TestDataEntity> Entities { get; set; } //replace
        public long StartTime { get; set; }
        public long Duration { get; set; }
        public string Type { get; set; }
        public List<SendEvent> SendEvents { get; set; } //remove
        public List<int> SentFromClientEvents { get; set; }
        public List<int> ReceivedAtServerEvents { get; set; }
        public List<int> SentFromServerEvents { get; set; }
    }
}