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

        public Chart MessagesReceived(int spacing)
        {
            var chart = new Chart {XAxis = BuildXAxis(spacing, Stopwatch.ElapsedMilliseconds)};
            var from = 0;
            foreach (var entity in TestDataEntities)
            {
                //tell opp antall meldinger innenfor hvert intervall
            }
            //For hver testDataEntity:
            //Hente ut meldinger hvor SentFromServer - StartTime > from og < to
            
            return chart;
        }

        public int CalcNumberOfMessagesInIntervalFromStart(int from, int to, IEnumerable<Message> messages)
        {
            return messages.Count(x => Round(false, (x.SentFromServer - StartTime).Seconds) >= from && Round(false, (x.SentFromServer - StartTime).Seconds) < to);
        }

        public string[] BuildXAxis(int spacing, long timeElapsed, bool includeZero = false)
        {
            var secondsElapsed = ((double)timeElapsed) / 1000;
            var seconds = Round(true, secondsElapsed);
            var length = seconds % spacing == 0 ? seconds / spacing : (seconds / spacing) + 1;
            length = includeZero ? length + 1 : length;
            var xAxis = new string[length];

            for (var i = 0; i < xAxis.Length; i++)
            {
                var baseNum = includeZero ? i : i + 1;
                xAxis[i] = (baseNum * spacing).ToString(CultureInfo.InvariantCulture);
            }

            return xAxis;
        }

        private static int Round(bool up, double value)
        {
            return up ? (int) Math.Ceiling(value) : (int) Math.Floor(value);
        }
    }
}