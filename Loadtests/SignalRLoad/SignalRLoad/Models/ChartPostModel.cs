using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class ChartPostModel
    {
        public IEnumerable<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
        public long Duration { get; set; }
        public string Type { get; set; }
    }
}