using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    /// <summary>
    /// Contains test data for a single client
    /// </summary>
    public class TestDataEntity
    {
        public IEnumerable<Message> Messages { get; set; }
        public DateTime CompletionTime { get; set; }
    }
}