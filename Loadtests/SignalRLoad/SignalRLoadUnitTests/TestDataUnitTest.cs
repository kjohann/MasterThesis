using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using NUnit.Framework;
using FluentAssertions;
using SignalRLoad.Models;

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
                TestDataEntities = new List<TestDataEntity>()
            };
        }
        
        [Test]
        public void CalcNumberOfMessagesInIntervalFromStart_should_return_only_messages_within_the_interval()
        {
            var message1 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(100) };
            var message2 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(300) };
            var message3 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(500) };
            var message4 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(999) };
            var message5 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(1000) };

            var messages =  new List<Message> { message1, message2, message3, message4, message5 };

            var numberOfMessages = _instance.CalcNumberOfMessagesInIntervalFromStart(0, 1, messages);
            var messagesInNext = _instance.CalcNumberOfMessagesInIntervalFromStart(1, 2, messages);

            numberOfMessages.ShouldBeEquivalentTo(4);
            messagesInNext.ShouldBeEquivalentTo(1);
        }

        [Test]
        public void CalcNumberOfMessagesInIntervalFromStart_should_return_0_if_there_were_no_messages()
        {
            _instance.CalcNumberOfMessagesInIntervalFromStart(0, 10, Enumerable.Empty<Message>()).ShouldBeEquivalentTo(0);
        }

        [Test]
        public void CalcNumberOfMessagesInIntervalFromStart_should_be_able_to_handle_larger_intervals()
        {
            var message1 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(1000) };
            var message2 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(3000) };
            var message3 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(5000) };
            var message4 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(9999) };
            var message5 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(10000) };

            var messages = new List<Message> { message1, message2, message3, message4, message5 };

            var numberOfMessages = _instance.CalcNumberOfMessagesInIntervalFromStart(0, 10, messages);
            var messagesInNext = _instance.CalcNumberOfMessagesInIntervalFromStart(10, 20, messages);

            numberOfMessages.ShouldBeEquivalentTo(4);
            messagesInNext.ShouldBeEquivalentTo(1);
        }

        [Test]
        public void CalcNumberOfMessagesInIntervalFromStart_should_return_only_messages_within_the_interval_also_for_client_messages()
        {
            var message1 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(100) };
            var message2 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(300) };
            var message3 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(500) };
            var message4 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(999) };
            var message5 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(1000) };

            var messages = new List<Message> { message1, message2, message3, message4, message5 };

            var numberOfMessages = _instance.CalcNumberOfMessagesInIntervalFromStart(0, 1, messages, true);
            var messagesInNext = _instance.CalcNumberOfMessagesInIntervalFromStart(1, 2, messages, true);

            numberOfMessages.ShouldBeEquivalentTo(4);
            messagesInNext.ShouldBeEquivalentTo(1);
        }

        [Test]
        public void CalcNumberOfMessagesInIntervalFromStart_should_return_0_if_there_were_no_messages_also_for_client_messages()
        {
            _instance.CalcNumberOfMessagesInIntervalFromStart(0, 10, Enumerable.Empty<Message>(), true).ShouldBeEquivalentTo(0);
        }

        [Test]
        public void CalcNumberOfMessagesInIntervalFromStart_should_be_able_to_handle_larger_intervals_also_for_client_messages()
        {
            var message1 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(1000) };
            var message2 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(3000) };
            var message3 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(5000) };
            var message4 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(9999) };
            var message5 = new Message { SentFromClient = _instance.StartTime.AddMilliseconds(10000) };

            var messages = new List<Message> { message1, message2, message3, message4, message5 };

            var numberOfMessages = _instance.CalcNumberOfMessagesInIntervalFromStart(0, 10, messages, true);
            var messagesInNext = _instance.CalcNumberOfMessagesInIntervalFromStart(10, 20, messages, true);

            numberOfMessages.ShouldBeEquivalentTo(4);
            messagesInNext.ShouldBeEquivalentTo(1);
        }

        [Test]
        public void BuildXAxis_should_give_one_and_two_if_elapsed_time_was_one_second_with_spacing_one()
        {
            var expectedAxis = new[] { "1", "2" };
            
            var axis = _instance.BuildXAxis(1, 1000);

            axis.ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildXAxis_should_give_ten_and_twenty_if_elapsed_time_was_ten_seconds_with_spacing_ten()
        {
            var expectedAxis = new[] { "10", "20" };

            var axis = _instance.BuildXAxis(10, 10000);

            axis.ShouldAllBeEquivalentTo(expectedAxis);            
        }

        [Test]
        public void BuildXAxis_should_give_a_xAxis_with_each_second_elapsed_if_spacing_is_equal_to_one()
        {
            var expectedAxis = new [] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11" };

            var axis = _instance.BuildXAxis(1, 10311); //10.311 seconds

            axis.ShouldAllBeEquivalentTo(expectedAxis);
        }        

        [Test]
        public void BuildXAxis_should_give_a_xAxis_with_intervals_that_matches_spacing()
        {
            var expectedAxis = new[] { "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110" };

            var axis = _instance.BuildXAxis(10, 103000); //103 seconds

            axis.ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void BuildXAxis_should_inclide_zero_if_specified()
        {
            var expectedAxis = new[] { "0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110" };

            var axis = _instance.BuildXAxis(10, 103000, true); //103 seconds

            axis.ShouldAllBeEquivalentTo(expectedAxis);
        }

        [Test]
        public void MakeDataSeries_should_a_series_of_data_containing_number_of_messages_sent_for_each_interval()
        {
            var message1 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(100) };
            var message2 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(300) };
            var message3 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(500) };
            var message4 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(999) };
            var message5 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(1000) };

            var messages = new List<Message> { message1, message2, message3, message4, message5 }; 
            _instance.TestDataEntities = new List<TestDataEntity>
            {
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages}
            };

            var data = _instance.MakeDataSeries(2, 1);
            var expecedData = new[] {"16", "4"};

            data.ShouldAllBeEquivalentTo(expecedData);

        }

        [Test]
        public void MakeDataSeries_should_be_able_to_handle_zero_in_an_interval()
        {
            var message1 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(1000) };
            var message2 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(3000) };
            var message3 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(5000) };
            var message4 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(9999) };
            var message5 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(10000) };

            var messages = new List<Message> { message1, message2, message3, message4, message5 }; 

            _instance.TestDataEntities = new List<TestDataEntity>
            {
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages}
            };

            var data = _instance.MakeDataSeries(11, 1);
            var expecedData = new[] { "0", "4", "0", "4", "0", "4", "0", "0", "0", "4", "4" };

            data.ShouldAllBeEquivalentTo(expecedData);
        }

        [Test]
        public void BuildYAxis_should_return_values_from_zero_up_to_and_including_the_maximum_value_if_less_than_fifty()
        {
            var data = new[] {1, 10, 32, 21, 15, 17, 19, 2, 2, 49, 48, 43, 6};
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
            var data = new[] {0, 1, 2, 3, 4, 0, 1, 2, 3, 4};
            var expectedYAxis = new[] { "0", "1", "2", "3", "4" };

            _instance.BuildYAxis(data).ShouldAllBeEquivalentTo(expectedYAxis);
        }

        [Test] //Check that everything works together
        public void MessagesReceivedAtServerAndSentFromClientsPrSecond_should_produce_a_chart_with_two_series()
        {
            var message1 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(1000), SentFromClient = _instance.StartTime.AddMilliseconds(500)};
            var message2 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(3000), SentFromClient = _instance.StartTime.AddMilliseconds(2500) };
            var message3 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(5000), SentFromClient = _instance.StartTime.AddMilliseconds(4500) };
            var message4 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(9999), SentFromClient = _instance.StartTime.AddMilliseconds(9499) };
            var message5 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(10200), SentFromClient = _instance.StartTime.AddMilliseconds(10000) };

            var messages = new List<Message> { message1, message2, message3, message4, message5 };

            _instance.TestDataEntities = new List<TestDataEntity>
            {
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages},
                new TestDataEntity{Messages = messages}
            };

            var chart = _instance.MessagesReceivedAtServerAndSentFromClientsPrSecond(1, 10000);
            var expectedXAxis = new[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11" };
            var expectedYAxis = new[] {"0", "1", "2", "3", "4"};
            var expectedSeries = new List<Series>()
            {
                new Series { Data = new[] { "0", "4", "0", "4", "0", "4", "0", "0", "0", "4", "4" }, Name = "Messages received by server pr. second"}, 
                new Series { Data = new[] { "4", "0", "4", "0", "4", "0", "0", "0", "0", "4", "4" }, Name = "Messages sent from clients pr. second"}
            };

            chart.XAxis.ShouldAllBeEquivalentTo(expectedXAxis);
            chart.YAxis.ShouldAllBeEquivalentTo(expectedYAxis);
            chart.Title.Should().Be("Messages sent from clients and received by server pr. second");
            chart.YAxisTitle.Should().Be("Messages");
            chart.Series.ShouldAllBeEquivalentTo(expectedSeries);            
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
    }
}
