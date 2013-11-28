using System;
using System.Text;
using System.Collections.Generic;
using NUnit.Framework;
using FluentAssertions;
//var test = new List<int>();
//test.Add(1337);
//test.Add(1);
//int outVal1 = test[0];
//int outVal2 = test[1];
//outVal1.ShouldBeEquivalentTo(1337);
//outVal2.ShouldBeEquivalentTo(1);
//test[0]++;
//test[1]++;
//outVal1 = test[0];
//outVal2 = test[1];
//outVal1.ShouldBeEquivalentTo(1338);
//outVal2.ShouldBeEquivalentTo(2);                
using SignalRLoad.Models;

namespace SignalRLoadUnitTests
{

    [TestFixture]
    public class MonitorUnitTest
    {
        private Monitor _monitor;

        [SetUp]
        public void SetUp()
        {
            _monitor = Monitor.GetInstance();
            _monitor.Reset();
            _monitor.StartTime = new DateTime(2013, 11, 3, 13, 37, 0);
        }

        [Test]
        public void RegisterSentFromClientEvent_should_register_an_event_within_the_correct_interval()
        {

        }

        private IEnumerable<long> GetDummyMillisecondValues(int eventInterval, int totalNumber)
        {
            var values = new List<long>();

            for (var i = 0; i < totalNumber; i++)
            {
                
            }
        }

    }
}
