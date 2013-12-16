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
        public HashSet<string> CompletedClients { get; set; }
        public long Duration { get; set; }
        public List<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
        public int Spacing { get; set; }

        // key: reprecents number of seconds * wanted spacing from startTime
        //value: the number of messages in that interval
        public List<int> SentFromClientEvents { get; set; }
        public List<int> ReceivedAtServerEvents { get; set; }
        public List<int> SentFromServerEvents { get; set; }

        public void RegisterSentFromClientEvent(long millisecondsSinceEpoch, int spacing = 1)
        {
            var key = GetKey(millisecondsSinceEpoch, spacing);
            AddEvent(SentFromClientEvents, key);
        }

        public void RegisterReceivedAtServerEvent(long millisecondsSinceEpoch, int spacing = 1)
        {
            var key = GetKey(millisecondsSinceEpoch, spacing);
            AddEvent(ReceivedAtServerEvents, key);
        }

        public void RegisterSentFromServerEvent(long millisecondsSinceEpoch, bool broadcast, int spacing = 1)
        {
            var key = GetKey(millisecondsSinceEpoch, spacing);
            var nrOfEvents = broadcast ? NumberOfClients : 1;
            AddEvent(SentFromServerEvents, key, nrOfEvents);
        }

        private int GetKey(long millisecondsSinceEpoch, int spacing)
        {
            var start = StartTime.ToMilliseconds();
            var milliSecondsSinceStart = millisecondsSinceEpoch - start;
            var seconds = Round(false, (double)milliSecondsSinceStart / 1000);
            return Round(false, (double)seconds / spacing);
        }

        private static int Round(bool up, double value)
        {
            return up ? (int)Math.Ceiling(value) : (int)Math.Floor(value);
        }

        public void AddEvent(List<int> eventStore, int key, int nrOfEvents = 1)
        {
            while (key > eventStore.Count) //cope with intervals without events in them (unlikely, but still..)
            {
                eventStore.Add(0);
            }
            if (eventStore.Count == key)
            {
                eventStore.Add(nrOfEvents);
            }
            else
            {
                eventStore[key] += nrOfEvents;
            }
        }

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

        public void Reset()
        {
            NumberOfClients = 0;
            CompletedClients = new HashSet<string>();
            Duration = 0;
            TestDataEntities = new List<TestDataEntity>();
            SentFromClientEvents = new List<int>();
            ReceivedAtServerEvents = new List<int>();
            SentFromServerEvents = new List<int>();
            Spacing = 0;
        }
    }
}