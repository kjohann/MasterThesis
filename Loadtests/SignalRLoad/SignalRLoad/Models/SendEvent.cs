using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class SendEvent
    {
        public long TimeStamp { get; set; }
        public int NumberOfMessages { get; set; }
    }
}