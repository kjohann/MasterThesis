using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class Monitor
    {
        private static Monitor _instance;
        public int NumberOfClients { get; set; }
        public int ExpectedTestDurationInMillis { get; set; }
        public long MessagesReceived { get; set; }
        public long MessagesSent { get; set; }
        public IEnumerable<string> CompletedClients { get; set; } 

        private Monitor() {}

        public static Monitor GetInstance()
        {
            return _instance ?? (_instance = new Monitor());
        }

        public bool Complete()
        {
            return CompletedClients.Count() == NumberOfClients;
        }

        public int OverTime(int actualTimeInMillis)
        {
            return actualTimeInMillis - ExpectedTestDurationInMillis;
        }
    }
}