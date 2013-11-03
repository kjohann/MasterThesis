using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;

namespace SignalRLoad.Models
{
    public class TestData
    {
        private static TestData _instance;
        public LinkedList<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
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
            var chart = new Chart {XAxis = BuildXAxis()};
            

            
            return chart;
        }

        private string[] BuildXAxis()
        {
            var seconds = (int) Math.Ceiling((double) Stopwatch.Elapsed.Seconds); //round up
            var xAxis = new string[seconds];

            for (var i = 0; i < xAxis.Length; i++)
            {
                xAxis[i] = i.ToString(CultureInfo.InvariantCulture);
            }

            return xAxis;
        }
    }
}