using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Security.Policy;
using SignalRLoad.Utils;

namespace SignalRLoad.Models
{
    public class TestData
    {
        public List<TestDataEntity> TestDataEntities { get; set; }
        public List<SendEvent> SendEvents { get; set; }
        public DateTime StartTime { get; set; }
        public List<int> SentFromClientEvents { get; set; }

        public TestData()
        {
            TestDataEntities = new List<TestDataEntity>();
        }
        
        public Chart MessagesReceivedAtServerAndSentFromClientsPrSecond(int spacing, int[] serverSet, int[] clientSet)
        {
            var xAxis = new string[serverSet.Length];
            for(var i = 0; i < xAxis.Length; i++)
            {
                xAxis[i] = i.ToString(CultureInfo.InvariantCulture);
            }
            
            var chart = new Chart
            {
                Title = Titles.MessagesSentFromClientsAndReceivedByServerPrSecond,
                XAxis = xAxis,
                YAxisTitle = "Messages"
            };
            var series = new List<Series>();

            series.Add(new Series
            {
                Name = Titles.MessagesReceivedByServerPrSecondSeries,
                Data = serverSet.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray()
            });


            series.Add(new Series
            {
                Name = Titles.MessagesSentFromClientsPrSecondSeries,
                Data = clientSet.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray()
            });

            chart.Series = series;           
            return chart;
        }
        
        public Chart MessagesSentByServerPrSecond(int spacing, int[] dataSet) 
        {
            var xAxis = new string[dataSet.Length];
            for (var i = 0; i < xAxis.Length; i++)
            {
                xAxis[i] = i.ToString(CultureInfo.InvariantCulture);
            }
            var chart = new Chart
            {
                Title = Titles.MessagesSentFromServerPrSecond,
                XAxis = xAxis,
                YAxisTitle = "Messages"
            };

            var series = new List<Series>();           

            series.Add(new Series
            {
                Name = Titles.GeneralMessagesSeries,
                Data = dataSet.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray()
            });

            chart.Series = series;

            return chart;
        }
       
        /// <summary>
        /// Gets the spacing for the axis as parameter. The length is the length of a data
        /// set that has this spacing already, so the method needs not manage this.
        /// </summary>
        /// <param name="spacing"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public string[] BuildXAxis(int spacing, int length)
        {
            var xAxis = new string[length];

            for (var i = 0; i < xAxis.Length; i++)
            {
                xAxis[i] = (i * spacing).ToString(CultureInfo.InvariantCulture);
            }

            return xAxis;
        }

        public int[] MakeMessagesSentFromClientOrReceivedByServerDataSeries(int length, int spacing, bool client = false)
        {
            //return SentFromClientEvents.ToArray();
            var data = new int[length];

            foreach (var entity in TestDataEntities)
            {
                var from = 0;
                for (var i = 0; i < data.Length; i++)
                {
                    data[i] += CalcNumberOfMessagesSendFromClientOrReceivedByServerInIntervalFromStart(from, from + spacing, entity.Messages, client);
                    from += spacing;
                }
            }

            return data;
        }

        public int[] MakeMessagesSentFromServerPrSecondDataSeries(int length, int spacing)
        {
            var data = new int[length];
            
            var from = 0;
            for (var i = 0; i < data.Length; i++)
            {
                data[i] += CalcNumberOfMessagesSentFromServerInIntervalFromStart(from, from + spacing);
                from += spacing;
            }

            return data;
        }

        public int CalcNumberOfMessagesSendFromClientOrReceivedByServerInIntervalFromStart(int from, int to, IEnumerable<Message> messages, bool client = false)
        {
            if (client)
            {
                return messages.Count(x => Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.SentFromClient) - StartTime).Seconds) >= from && 
                    Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.SentFromClient) - StartTime).Seconds) < to);
            }

            return messages.Count(x => Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.ReceivedAtServer) - StartTime).Seconds) >= from && 
                Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.ReceivedAtServer) - StartTime).Seconds) < to);
        }

        public int CalcNumberOfMessagesSentFromServerInIntervalFromStart(int from, int to) 
        {   
            return SendEvents.Where(x => Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.TimeStamp) - StartTime).Seconds) >= from && 
                Round(false, (DateUtils.FromMillisecondsSinceEpoch(x.TimeStamp) - StartTime).Seconds) < to)
                .Sum(x => x.NumberOfMessages);
        }

        public string[] BuildYAxis(int[] allData) //Need or introduce higher spacing?
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