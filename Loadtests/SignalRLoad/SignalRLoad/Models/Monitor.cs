using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using SignalRLoad.Extensions;

namespace SignalRLoad.Models
{
    public class Monitor
    {
        private static Monitor _instance;
        public int NumberOfClients { get; set; }
        public int ExpectedTestDurationInMillis { get; set; }
        public long MessagesReceived { get; set; }
        public long MessagesSent { get; set; }
        public HashSet<string> CompletedClients { get; set; }
        public Stopwatch Stopwatch { get; set; }
        public List<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
        public List<SendEvent> SendEvents { get; set; }

        private Monitor()
        {
            Reset();
        }

        public static Monitor GetInstance()
        {
            return _instance ?? (_instance = new Monitor());
        }

        public bool Complete()
        {
            return CompletedClients.Count() == NumberOfClients;
        }

        public bool HarvestedAll()
        {
            return TestDataEntities.Count() == NumberOfClients;
        }

        public int OverTime(int actualTimeInMillis)
        {
            return actualTimeInMillis - ExpectedTestDurationInMillis;
        }

        public void RegisterReceivedMessage()
        {
            MessagesReceived++;
        }

        public void RegisterSentEchoMessage(long timeStamp)
        {
            MessagesSent++;
            SendEvents.Add(new SendEvent
            {
                NumberOfMessages = 1,
                TimeStamp = timeStamp
            });

        }

        public void RegisterSentBroadcastMessage(long timeStamp)
        {
            MessagesSent += NumberOfClients;
            SendEvents.Add(new SendEvent
            {
                NumberOfMessages = NumberOfClients,
                TimeStamp = timeStamp
            });
        }

        public void Reset()
        {
            NumberOfClients = 0;
            ExpectedTestDurationInMillis = 0;
            MessagesReceived = 0;
            MessagesSent = 0;
            CompletedClients = new HashSet<string>();
            Stopwatch = new Stopwatch();
            TestDataEntities = new List<TestDataEntity>();
            SendEvents = new List<SendEvent>();
        }
    }
}