using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using SignalRLoad.Utils;

namespace SignalRLoad.Models
{
    public class TestData
    {
        public List<TestDataEntity> TestDataEntities { get; set; }
        public DateTime StartTime { get; set; }

        public TestData()
        {
            TestDataEntities = new List<TestDataEntity>();
        }
 

        public Chart MessagesReceivedAtServerAndSentFromClientsPrSecond(int spacing, long milliseconds, bool includeZero = false)
        {
            var chart = new Chart
            {
                Title = Titles.MessagesSentFromClientsAndReceivedByServerPrSecond,
                XAxis = BuildXAxis(spacing, milliseconds, includeZero),
                YAxisTitle = "Messages"
            };
            var series = new List<Series>();    
            var serverData = MakeDataSeries(chart.XAxis.Length, spacing);                   

            series.Add(new Series
            { 
                Name = Titles.MessagesReceivedByServerPrSecondSeries,
                Data = serverData.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray() 
            });

            var clientData = MakeDataSeries(chart.XAxis.Length, spacing, true);

            series.Add(new Series
            {
                Name = Titles.MessagesSentFromClientsPrSecondSeries,
                Data = clientData.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray()
            });

            chart.Series = series;
            
            var combinedData = new int[serverData.Length + clientData.Length];
            serverData.CopyTo(combinedData, 0);
            clientData.CopyTo(combinedData, serverData.Length);
            
            chart.YAxis = BuildYAxis(combinedData);

            return chart;
        }
       
        public string[] BuildXAxis(int spacing, long timeElapsed, bool includeZero = false)
        {
            var secondsElapsed = (double) timeElapsed/spacing;
            secondsElapsed = (secondsElapsed/1000);
            var seconds = Round(true, secondsElapsed);
            var length = seconds;

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

        public int[] MakeDataSeries(int length, int spacing, bool client = false)
        {
            var data = new int[length];

            foreach (var entity in TestDataEntities)
            {
                var from = 0;
                for (var i = 0; i < data.Length; i++)
                {
                    data[i] += CalcNumberOfMessagesInIntervalFromStart(from, from + spacing, entity.Messages, client);
                    from += spacing;
                }
            }

            return data;
        }

        public int CalcNumberOfMessagesInIntervalFromStart(int from, int to, IEnumerable<Message> messages, bool client = false)
        {
            if (client)
            {
                return messages.Count(x => Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.SentFromClient) - StartTime).Seconds) >= from && 
                    Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.SentFromClient) - StartTime).Seconds) < to);
            }

            return messages.Count(x => Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.SentFromServer) - StartTime).Seconds) >= from && 
                Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.SentFromServer) - StartTime).Seconds) < to);
        }

        public string[] BuildYAxis(int[] allData)
        {
            var max = allData.Max(x => x);

            var spacing = max > 50 ? 10 : 1;
            int length;

            if (spacing == 1)
            {
                length = max;
            }
            else if (max%spacing == 0)
            {
                length = max/spacing;
            }
            else
            {
                length = (max/spacing) + 1;
            }

            var axis = new string[length + 1]; //Always include 0

            axis[0] = "0";

            for (var i = 1; i < axis.Length; i++)
            {
                axis[i] = (i*spacing).ToString(CultureInfo.InvariantCulture);
            }

            return axis;
        }

        private static int Round(bool up, double value)
        {
            return up ? (int) Math.Ceiling(value) : (int) Math.Floor(value);
        }
    }
}