﻿using System;
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
        public int ExpectedTestDurationInMillis { get; set; } //Probably delete
        public long MessagesReceived { get; set; } //Probably delete
        public long MessagesSent { get; set; } //Probably delete
        public HashSet<string> CompletedClients { get; set; } 
        public Stopwatch Stopwatch { get; set; } //Probably delete and just use DateTime
        public List<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
        public List<SendEvent> SendEvents { get; set; } //Probably delete

        /*
         * Refactor stuff: Unbind messages from id parameter, so that client and
         * server only have to keep track of number of messages sent in a given interval from
         * StartTime. Hopefully, that will work a lot better.
         */
        // key: reprecents number of seconds * wanted spacing from startTime
        //value: the number of messages in that interval
        public List<int> SentFromClientEvents { get; set; }
        public List<int> ReceivedAtServerEvents { get; set; }
        public List<int> SentFromServerEvents { get; set; }

        public void RegisterSentFromClientEvent(long millisecondsSinceEpoch, int spacing = 1)
        {
            var start = StartTime.ToMilliseconds();
            var milliSecondsSinceStart = millisecondsSinceEpoch - start;
            var seconds = Round(false, milliSecondsSinceStart / 1000);
            var key = Round(false, seconds / spacing);
            if (SentFromClientEvents.Count == key)
            {
                SentFromClientEvents.Add(1);
            }
            else
            {
                SentFromClientEvents[key]++;
            }
        }

        private static int Round(bool up, double value)
        {
            return up ? (int)Math.Ceiling(value) : (int)Math.Floor(value);
        }


        //End refactor stuff

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
            SentFromClientEvents = new List<int>();
            ReceivedAtServerEvents = new List<int>();
            SentFromServerEvents = new List<int>();
        }
    }
}