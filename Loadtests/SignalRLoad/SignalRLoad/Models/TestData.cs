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

            var test = DateTime.Now; //test - StartTime gir f.eks 12 sekunder..
            //For hver testDataEntity:
            //Hente ut meldinger hvor SentFromServer - StartTime > from og < to
            
            return chart;
        }

        private int CalcNumberOfMessagesInIntervalFromStart(int from, int to)
        {
            return TestDataEntities.Select(x => x.Messages.Where(
                y => Round(false, (y.SentFromServer - StartTime).Seconds) >= @from && 
                    Round(false, (y.SentFromServer - StartTime).Seconds) < to)).Count();
        }

        private string[] BuildXAxis()
        {
            var seconds = Round(true, Stopwatch.Elapsed.Seconds);
            var xAxis = new string[seconds];

            for (var i = 0; i < xAxis.Length; i++)
            {
                xAxis[i] = i.ToString(CultureInfo.InvariantCulture);
            }

            return xAxis;
        }

        private int Round(bool up, int value)
        {
            return up ? (int) Math.Ceiling((double) value) : (int) Math.Floor((double) value);
        }
    }
}