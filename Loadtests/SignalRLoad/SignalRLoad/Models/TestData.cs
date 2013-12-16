using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace SignalRLoad.Models
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
            var series = new List<Series>
            {
                new Series
                {
                    Name = Titles.MessagesReceivedByServerPrSecondSeries,
                    Data = serverSet
                },
                new Series
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

            var series = new List<Series>
            {
                new Series
                {
                    Name = Titles.GeneralMessagesSeries,
                    Data = dataSet
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