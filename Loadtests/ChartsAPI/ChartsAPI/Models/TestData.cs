using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Shared.Models;

namespace ChartsAPI.Models
{
    public class TestData
    {
        public DateTime StartTime { get; set; }
        
        public Chart MessagesReceivedAtServerAndSentFromClientsPrSecond(int spacing, int[] serverSet, int[] clientSet)
        {
            var xAxis = BuildXAxis(spacing, serverSet.Length);
            var chart = new Chart
            {
                Title = Titles.MessagesSentFromClientsAndReceivedByServerPrSecond,
                XAxis = xAxis,
                YAxisTitle = "Messages"
            };
            var series = new List<ISeries>
            {
                new Series<int>
                {
                    Name = Titles.MessagesReceivedByServerPrSecondSeries,
                    Data = serverSet
                },
                new Series<int>
                {
                    Name = Titles.MessagesSentFromClientsPrSecondSeries,
                    Data = clientSet
                }
            };


            chart.Series = series;           
            return chart;
        }
        
        public Chart MessagesSentByServerPrSecond(int spacing, int[] dataSet)
        {
            var xAxis = BuildXAxis(spacing, dataSet.Length);
            var chart = new Chart
            {
                Title = Titles.MessagesSentFromServerPrSecond,
                XAxis = xAxis,
                YAxisTitle = "Messages"
            };

            var series = new List<ISeries>
            {
                new Series<int>
                {
                    Name = Titles.GeneralMessagesSeries,
                    Data = dataSet
                }
            };

            chart.Series = series;

            return chart;
        }

        public Chart AverageLatencyPrSecond(int spacing, List<TestDataEntity> entities, int[] clientData)
        {
            var chart = new Chart
            {
                Title = Titles.AverageLatency,
                XAxis = BuildXAxis(spacing, clientData.Length),
                YAxisTitle = "Average milliseconds"
            };

            var averages = GetAverageLatencyData(entities, clientData);

            var series = new List<ISeries>
            {
                new Series<double>
                {
                    Name = Titles.AverageLatencySeries,
                    Data = averages
                }
            };

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

        public double[] GetAverageLatencyData(List<TestDataEntity> entities, int[] clientData)
        {
            var averages = new List<double>();            

            for (var i = 0; i < clientData.Length; i++)
            {
                var totalLatency = 0.00;
                for (var j = 0; j < entities.Count; j++)
                {
                    var testEntities = entities[j].LatencyData.ToArray();
                    if (i < testEntities.Count())
                    {
                        totalLatency += testEntities[i];
                    }

                    if (j != entities.Count - 1) continue;

                    var average = totalLatency / clientData[i];
                    var formatted = String.Format("{0:0.00}", average);
                    averages.Add(Convert.ToDouble(formatted));
                }
            }

            return averages.ToArray();
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