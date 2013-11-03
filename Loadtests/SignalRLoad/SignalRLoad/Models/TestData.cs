using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace SignalRLoad.Models
{
    public class TestData
    {
        private static TestData _instance;
        public LinkedList<TestDataEntity> TestDataEntities { get; set; }
        public Stopwatch Stopwatch { get; set; }

        private TestData()
        {
            Stopwatch = new Stopwatch();
            TestDataEntities = new LinkedList<TestDataEntity>();
        }

        public static TestData GetInstance()
        {
            return _instance ?? (_instance = new TestData());
        }

        public Chart MessagesReceived()
        {

            return null;
        }

        private string[] BuildXAxis()
        {
            return null;
        }
    }
}