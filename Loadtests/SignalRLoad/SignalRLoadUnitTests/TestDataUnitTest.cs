using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using NUnit.Framework;
using FluentAssertions;
using SignalRLoad.Extensions;
using SignalRLoad.Models;
using SignalRLoad.Extensions;

namespace SignalRLoadUnitTests
{
    [TestFixture]
    public class TestDataUnitTest
    {
        private TestData _instance;

        [SetUp]
        public void SetUp()
        {
            _instance = new TestData
            {
                StartTime = new DateTime(2013, 11, 3, 13, 37, 0),        
            };
        }

        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_two_series()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);
  
            chart.Series.Count.Should().Be(2);
            chart.Series[0].Data.ShouldAllBeEquivalentTo(serverSet);            
            chart.Series[1].Data.ShouldAllBeEquivalentTo(clientSet);
        }

        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_serverData_as_the_first_series()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);
            
            chart.Series[0].Data.ShouldAllBeEquivalentTo(serverSet);
        }
        
        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_clientData_as_the_second_series()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);

            chart.Series[1].Data.ShouldAllBeEquivalentTo(clientSet);
        }
        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_x_axis_having_same_length_as_dataSets()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);
            
            chart.XAxis.Length.Should().Be(serverSet.Length);
        }

        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_give_chart_with_correct_title_and_name_for_series()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);
            
            chart.Title.Should().Be(Titles.MessagesSentFromClientsAndReceivedByServerPrSecond);
            chart.Series[0].Name.Should().Be(Titles.MessagesReceivedByServerPrSecondSeries);
            chart.Series[1].Name.Should().Be(Titles.MessagesSentFromClientsPrSecondSeries);
        }

        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_not_take_more_than_one_second_with_large_dataSet()
        {
            var stopWatch = new Stopwatch();
            var serverSet = GetDummyDataSet(1000, 50).ToArray();
            var clientSet = GetDummyDataSet(1000, 40).ToArray(); //This difference is just for testing purposes

            stopWatch.Start();
            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);
            stopWatch.Stop();

            stopWatch.ElapsedMilliseconds.Should().BeLessOrEqualTo(1000);

        }

        [Test]
        public void BuildXAxis_should_give_an_axis_consisting_of_numbers_from_zero_and_up_with_given_spacing_this_with_one()
        {
            var expectedAxis = new[] { "0", "1", "2", "3", "4", "5" };

            var axis = _instance.BuildXAxis(1, 6);

            axis.ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildXAxis_should_give_an_axis_consisting_of_numbers_from_zero_and_up_with_given_spacing_this_with_ten()
        {
            var expectedAxis = new[] { "0", "10", "20", "30", "40", "50", "60", "70" };

            var axis = _instance.BuildXAxis(10, 8);

            axis.ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildXAxis_should_not_take_more_than_100_millis_on_large_dataSet()
        {
            var expectedAxis = new string[1000]; //Largest I will operate with is probably no more than 10.. with spacing 10.
            for (var i = 0; i < expectedAxis.Length; i++)
            {
                expectedAxis[i] = i + "";
            }
            var stopWatch = new Stopwatch();
            stopWatch.Start();
            
            var axis = _instance.BuildXAxis(1, 1000);            
            
            stopWatch.Stop();

            axis.Length.Should().Be(1000);
            stopWatch.ElapsedMilliseconds.Should().BeLessOrEqualTo(100);
        }

        [Test]
        public void BuildYAxis_should_return_values_from_zero_up_to_and_including_the_maximum_value_if_less_than_fifty()
        {
            var data = new[] { 1, 10, 32, 21, 15, 17, 19, 2, 2, 49, 48, 43, 6 };
            var expectedAxis = GetStringsWithSpacingOfOne();

            _instance.BuildYAxis(data).ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildYAxis_should_return_values_from_zero_up_to_above_maximum_with_spacing_10_if_larger_than_fifty()
        {
            var data = new[] { 1, 10, 72, 21, 15, 17, 59, 2, 2, 49, 48, 43, 6 };
            var expectedAxis = new[] { "0", "10", "20", "30", "40", "50", "60", "70", "80" };

            _instance.BuildYAxis(data).ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildYAxis_should_return_values_from_zero_up_to_exactly_maximum_with_spacing_10_if_max_is_round_number()
        {
            var data = new[] { 1, 10, 72, 21, 15, 17, 59, 2, 2, 49, 48, 43, 6, 80 };
            var expectedAxis = new[] { "0", "10", "20", "30", "40", "50", "60", "70", "80" };

            _instance.BuildYAxis(data).ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildYAxis_should_return_values_from_zero_up_to_exactly_maximum_if_max_is_a_one_diget_number()
        {
            var data = new[] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 };
            var expectedYAxis = new[] { "0", "1", "2", "3", "4" };

            _instance.BuildYAxis(data).ShouldAllBeEquivalentTo(expectedYAxis);
        }

        private static IEnumerable<string> GetStringsWithSpacingOfOne()
        {
            var strings = new string[50];

            for (var i = 0; i < 50; i++)
            {
                strings[i] = i.ToString(CultureInfo.InvariantCulture);
            }

            return strings;
        }

        private static IEnumerable<int> GetDummyDataSet(int length, int numberPrInterval)
        {
            for (var i = 0; i < length; i++)
            {
                yield return numberPrInterval;
            }
        }
    }
}
