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
        public List<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }
        public Stopwatch Stopwatch { get; set; }

        private TestData()
        {
            Stopwatch = new Stopwatch();
            TestDataEntities = new List<TestDataEntity>();
        }

        public static TestData GetInstance()
        {
            return _instance ?? (_instance = new TestData());
        }   

        public Chart MessagesReceivedAtServerPrSecond(int spacing)
        {
            var chart = new Chart{ XAxis = BuildXAxis(spacing, Stopwatch.ElapsedMilliseconds) };
            var series = new List<Series>(); //will only have one series, at least for now     
            var data = MakeDataSeries(chart.XAxis.Length, spacing);                   

            series.Add(new Series
            { 
                Name = "Messages received by server pr. second",
                Data = data.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray() 
            });

            chart.Series = series;

            return chart;
        }
       
        public string[] BuildXAxis(int spacing, long timeElapsed, bool includeZero = false)
        {
            //var secondsElapsed = ((double)timeElapsed) / 1000;
            //var seconds = Round(true, secondsElapsed);
            //var length = seconds % spacing == 0 ? seconds / spacing : (seconds / spacing) + 1;
            //length = includeZero ? length + 1 : length;

            var secondsElapsed = (double) timeElapsed/spacing;
            secondsElapsed = ((double) secondsElapsed/1000);
            var seconds = Round(true, secondsElapsed);
            var length = seconds;// % spacing == 0 ? seconds / spacing : (seconds / spacing) + 1;

            if (includeZero || ((int) secondsElapsed) == seconds)
            {
                length = length + 1;
            }

            var xAxis = new string[length];

            for (var i = 0; i < xAxis.Length; i++)
            {
                var baseNum = includeZero ? i : i + 1;
                xAxis[i] = (baseNum * spacing).ToString(CultureInfo.InvariantCulture);
            }

            return xAxis;
        }

        public int[] MakeDataSeries(int length, int spacing)
        {
            var data = new int[length];

            foreach (var entity in TestDataEntities)
            {
                var from = 0;
                for (var i = 0; i < data.Length; i++)
                {
                    data[i] += CalcNumberOfMessagesInIntervalFromStart(from, from + spacing, entity.Messages);
                    from += spacing;
                }
            }

            return data;
        }

        public int CalcNumberOfMessagesInIntervalFromStart(int from, int to, IEnumerable<Message> messages)
        {
            return messages.Count(x => Round(false, (x.SentFromServer - StartTime).Seconds) >= from && Round(false, (x.SentFromServer - StartTime).Seconds) < to);
        }



        private static int Round(bool up, double value)
        {
            return up ? (int) Math.Ceiling(value) : (int) Math.Floor(value);
        }
    }
}