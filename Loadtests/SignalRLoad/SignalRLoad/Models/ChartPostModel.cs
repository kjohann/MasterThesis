using System.Collections.Generic;

namespace SignalRLoad.Models
{
    public class ChartPostModel
    {
        public long StartTime { get; set; }
        public long Duration { get; set; }
        public string Type { get; set; }
        public List<int> SentFromClientEvents { get; set; }
        public List<int> ReceivedAtServerEvents { get; set; }
        public List<int> SentFromServerEvents { get; set; }
        public List<TestDataEntity> TestDataEntities { get; set; }
        public int Spacing { get; set; }
    }
}