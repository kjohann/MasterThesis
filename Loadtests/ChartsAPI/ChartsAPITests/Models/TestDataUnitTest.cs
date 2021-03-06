﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using ChartsAPI.Models;
using FluentAssertions;
using NUnit.Framework;
using Shared.Models;

namespace ChartsAPITests.Models
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
        }

        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_serverData_as_the_first_series()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);
            
            ((Series<int>)(chart.Series[0])).Data.ShouldAllBeEquivalentTo(serverSet);
        }
        
        [Test]
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_clientData_as_the_second_series()
        {
            var serverSet = GetDummyDataSet(100, 50).ToArray();
            var clientSet = GetDummyDataSet(100, 40).ToArray(); //This difference is just for testing purposes

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(10, serverSet, clientSet);

            ((Series<int>)(chart.Series[1])).Data.ShouldAllBeEquivalentTo(clientSet);
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
        public void MessagesSentByServerPrSecond_should_produce_a_chart_with_one_series()
        {
            var dataSet = GetDummyDataSet(100, 500).ToArray();

            var chart = _instance.MessagesSentByServerPrSecond(10, dataSet);

            chart.Series.Count.Should().Be(1);
        }

        [Test]
        public void MessagesSentByServerPrSecond_should_produce_a_chart_with_correct_dataSet()
        {
            var dataSet = GetDummyDataSet(100, 500).ToArray();

            var chart = _instance.MessagesSentByServerPrSecond(10, dataSet);

            ((Series<int>)(chart.Series[0])).Data.ShouldAllBeEquivalentTo(dataSet);
        }

        [Test]
        public void MessagesSentByServerPrSecond_should_produce_a_chart_with_x_axis_having_same_length_as_dataSet()
        {
            var dataSet = GetDummyDataSet(100, 500).ToArray();

            var chart = _instance.MessagesSentByServerPrSecond(10, dataSet);

            chart.XAxis.Length.Should().Be(dataSet.Length);
        }

        [Test]
        public void MessagesSentByServerPrSecond_should_give_chart_with_correct_title_and_name_for_series()
        {
            var dataSet = GetDummyDataSet(100, 500).ToArray();

            var chart = _instance.MessagesSentByServerPrSecond(10, dataSet);

            chart.Title.Should().Be(Titles.MessagesSentFromServerPrSecond);
            chart.Series[0].Name.Should().Be(Titles.GeneralMessagesSeries);
        }

        [Test]
        public void MessagesSentByServerPrSecond_should_not_take_more_than_one_second_with_large_dataSet()
        {
            var stopwatch = new Stopwatch();
            var dataSet = GetDummyDataSet(100, 500).ToArray();
            
            stopwatch.Start();
            var chart = _instance.MessagesSentByServerPrSecond(10, dataSet);
            stopwatch.Stop();

            stopwatch.ElapsedMilliseconds.Should().BeLessOrEqualTo(1000);
        }

        [Test]
        public void AverageLatencyPrSecond_should_produce_a_chart_with_one_series()
        {
            var entities = GetTestDataEntities(3, 15, 120);
            var clientData = GetDummyDataSet(15, 6).ToArray();

            var chart = _instance.AverageLatencyPrSecond(1, entities, clientData);

            chart.Series.Count.Should().Be(1);
        }

        [Test]
        public void AverageLatencyPrSecond_should_produce_a_chart_with_correct_dataSet()
        {
            var entities = GetTestDataEntities(3, 15, 120);
            var clientData = GetDummyDataSet(15, 6).ToArray();

            var expectedData = new[] { 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60 };

            var chart = _instance.AverageLatencyPrSecond(10, entities, clientData);

            ((Series<double>)(chart.Series[0])).Data.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void AverageLatencyPrSecond_should_produce_a_chart_with_x_axis_having_same_length_as_incoming_clientData()
        {
            var entities = GetTestDataEntities(3, 15, 120);
            var clientData = GetDummyDataSet(15, 6).ToArray();

            var chart = _instance.AverageLatencyPrSecond(1, entities, clientData);

            chart.XAxis.Length.Should().Be(clientData.Length);
        }

        [Test]
        public void AverageLatencyPrSecond_should_give_chart_with_correct_title_and_name_for_series()
        {
            var entities = GetTestDataEntities(3, 15, 120);
            var clientData = GetDummyDataSet(15, 6).ToArray();

            var chart = _instance.AverageLatencyPrSecond(1, entities, clientData);

            chart.Title.Should().Be(Titles.AverageLatency);
            chart.Series[0].Name.Should().Be(Titles.AverageLatencySeries);
        }

        [Test]
        public void AverageLatencyPrSecond_should_not_take_more_than_one_second_with_large_dataSet()
        {
            var entities = GetTestDataEntities(10, 300, 100);
            var clientData = GetDummyDataSet(300, 60).ToArray();

            var stopwatch = new Stopwatch();

            stopwatch.Start();
            _instance.AverageLatencyPrSecond(1, entities, clientData);
            stopwatch.Stop();

            stopwatch.ElapsedMilliseconds.Should().BeLessOrEqualTo(1000);
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
        public void GetAverageLatencyData_should_calculate_average_values_from_all_TestDataEntities()
        {
            var entities = GetTestDataEntities(3, 15, 120);
            var clientData = GetDummyDataSet(15, 6).ToArray();

            var expectedData = new[] {60,60,60,60,60,60,60,60,60,60,60,60,60,60,60};

            _instance.GetAverageLatencyData(entities, clientData).ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void GetAverageLatencyData_should_be_able_to_handle_uneven_number_of_clients_pr_browser()
        {
            var entities = GetTestDataEntities(5, 10, 140);
            var clientData = GetDummyDataSet(10, 9).ToArray();
          
            var expectedData = new[] {77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78};

            _instance.GetAverageLatencyData(entities, clientData).ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void GetAverageLatencyData_should_be_able_to_handle_entities_with_different_lengths()
        {
            var entities = GetTestDataEntities(5, 10, 140, true);
            var clientData = GetDummyDataSet(12, 9).ToArray();

            var expectedData = new[] { 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 77.78, 15.56, 15.56 };

            _instance.GetAverageLatencyData(entities, clientData).ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void GetAverageLatencyData_should_be_able_to_handle_large_data_sets_in_less_than_one_second()
        {
            var entities = GetTestDataEntities(10, 300, 100);
            var clientData = GetDummyDataSet(300, 60).ToArray();
            
            var stopWatch = new Stopwatch();
            
            stopWatch.Start();
            var data = _instance.GetAverageLatencyData(entities, clientData);
            stopWatch.Stop();

            stopWatch.ElapsedMilliseconds.Should().BeLessOrEqualTo(1000);     
            foreach (var d in data) //because shouldAllBeEqual takes to long
            {
                d.ShouldBeEquivalentTo(16.67);
            }
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

        private static List<TestDataEntity> GetTestDataEntities(int numberOfBrowsers, int lengthOfSequence, int accumulatedLatencyPrInterval, bool firstLonger = false)
        {
            var entities = new List<TestDataEntity>();
            for (var i = 0; i < numberOfBrowsers; i++)
            {
                var list = new List<int>();
                for (var j = 0; j < lengthOfSequence; j++)
                {
                    list.Add(accumulatedLatencyPrInterval);
                }

                if (firstLonger)
                {
                    list.Add(accumulatedLatencyPrInterval);
                    list.Add(accumulatedLatencyPrInterval);
                    firstLonger = false;
                }
                //pr. browser
                entities.Add(new TestDataEntity
                {
                    LatencyData = list
                });
            }
            return entities;
        }
    }
}
