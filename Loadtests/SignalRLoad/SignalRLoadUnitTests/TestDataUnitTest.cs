using System;
using System.Collections;
using System.Collections.Generic;
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
            _instance.TestDataEntities = new LinkedList<TestDataEntity>(); //reset singleton
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
    }
}
