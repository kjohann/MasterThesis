using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Shared.Extensions;
using Shared.Models;

namespace SignalRLoad.Models
{
    public class Monitor
    {
        private static readonly Lazy<Monitor> _instance = new Lazy<Monitor>(() => new Monitor());
        public int NumberOfClients { get; set; }
        public BlockingCollection<string> CompletedClients { get; set; }
        public long Duration { get; set; }
        public BlockingCollection<TestDataEntity> TestDataEntities { get; set; }
        public DateTime ClientStartTime { get; set; }
        public DateTime ServerStartTime { get; set; }
        public int Spacing { get; set; }
        public int Harvested { get; set; }

        private Object _insertLock = new Object();

        // key: reprecents number of seconds * wanted spacing from startTime
        //value: the number of messages in that interval
        public ConcurrentDictionary<int, int> SentFromClientEvents { get; set; }
        public ConcurrentDictionary<int, int> ReceivedAtServerEvents { get; set; }
        public ConcurrentDictionary<int, int> SentFromServerEvents { get; set; }


        public int RegisterSentFromClientEvent(long millisecondsSinceEpoch, int spacing = 1)
        {
            var key = GetKey(millisecondsSinceEpoch, spacing, true);
            AddEvent(SentFromClientEvents, key);
            return key;
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

        private int GetKey(long millisecondsSinceEpoch, int spacing, bool client = false)
        {
            var start = client ? ClientStartTime.ToMilliseconds() : ServerStartTime.ToMilliseconds();
            var milliSecondsSinceStart = millisecondsSinceEpoch - start;
            var seconds = Round(false, (double)milliSecondsSinceStart / 1000);
            return Round(false, (double)seconds / spacing);
        }

        private static int Round(bool up, double value)
        {
            return up ? (int)Math.Ceiling(value) : (int)Math.Floor(value);
        }

        public void AddEvent(ConcurrentDictionary<int, int> eventStore, int key, int nrOfEvents = 1)
        {
            //lock (_insertLock)
            //{
                while (key > eventStore.Count) //cope with intervals without events in them (unlikely, but still..)
                {
                    eventStore.AddOrUpdate(eventStore.Count, 0, (k, old) => old);
                }
                if (eventStore.Count == key)
                {
                    eventStore.TryAdd(key,nrOfEvents);
                }
                else
                {
                    //eventStore[key] += nrOfEvents;
                    eventStore.AddOrUpdate(key, nrOfEvents, (k, old) => old + nrOfEvents);
                }
            //}
        }

        private Monitor()
        {
            Reset();            
        }

        public static Monitor GetInstance()
        {
            return _instance.Value;
        }

        public bool Complete()
        {
            return CompletedClients.Count() == NumberOfClients;
        }

        public bool HarvestedAll()
        {
            return Harvested == NumberOfClients;
        }

        public void Reset()
        {
            NumberOfClients = 0;
            CompletedClients = new BlockingCollection<string>();
            Duration = 0;
            TestDataEntities = new BlockingCollection<TestDataEntity>();
            SentFromClientEvents = new ConcurrentDictionary<int, int>();
            ReceivedAtServerEvents = new ConcurrentDictionary<int, int>();
            SentFromServerEvents = new ConcurrentDictionary<int, int>();
            Spacing = 0;
            Harvested = 0;
        }
    }
}