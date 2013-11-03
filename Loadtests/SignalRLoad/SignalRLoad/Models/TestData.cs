using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRLoad.Models
{
    public class TestData
    {
        private static TestData _instance;
        public LinkedList<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime CompletionTme { get; set; }

        private TestData()
        {
            TestDataEntities = new LinkedList<TestDataEntity>();
        }

        public static TestData GetInstance()
        {
            return _instance ?? (_instance = new TestData());
        }
    }
}