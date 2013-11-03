using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
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
            _instance = TestData.GetInstance();
            _instance.StartTime = new DateTime(2013, 11, 3, 13, 37, 0); //13:37 3.11.2013
            _instance.TestDataEntities = new List<TestDataEntity>(); //reset singleton
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
            _instance.TestDataEntities = new List<TestDataEntity>
            {
                new TestDataEntity{Messages = GetMessages()},
                new TestDataEntity{Messages = GetMessages()},
                new TestDataEntity{Messages = GetMessages()},
                new TestDataEntity{Messages = GetMessages()}
            };

            var data = _instance.MakeDataSeries(2, 1);
        }

        private IEnumerable<Message> GetMessages()
        {
            var message1 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(100) };
            var message2 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(300) };
            var message3 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(500) };
            var message4 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(999) };
            var message5 = new Message { SentFromServer = _instance.StartTime.AddMilliseconds(1000) };

            return new List<Message> { message1, message2, message3, message4, message5 };            
        } 

    }
}
