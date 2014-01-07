using System;
using System.Collections.Generic;
using FluentAssertions;
using NUnit.Framework;
using Shared.Extensions;
using SignalRLoad.Models;

namespace SignalRLoadUnitTests.Models
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
            _monitor.NumberOfClients = 100;
        }

        [Test]
        public void RegisterSentFromClientEvent_should_register_an_event_within_the_correct_interval()
        {
            var values = GetDummyMillisecondValues(200, 20);
            RegisterSentFromClientEvents(values);

            var expectedData = new[] {4, 5, 5, 5, 1};

            _monitor.SentFromClientEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromClientEvent_should_register_an_event_also_with_different_spacing()
        {
            var values = GetDummyMillisecondValues(200, 40);
            RegisterSentFromClientEvents(values, 5);

            var expectedData = new[] {24, 16};
            _monitor.SentFromClientEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromClientEvent_should_be_able_to_handle_large_dataSets()
        {
            var values = GetDummyMillisecondValues(100, 1000);
            RegisterSentFromClientEvents(values, 10);

            var expectedData = new[] {99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1};
            _monitor.SentFromClientEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromClientEvent_should_return_the_corresponding_key_for_the_event_with_spacing_one()
        {
            var startLong = _monitor.StartTime.ToMilliseconds();
            _monitor.RegisterSentFromClientEvent(startLong + 999).Should().Be(0);
        }

        [Test]
        public void RegisterSentFromClientEvent_should_return_the_corresponding_key_for_the_event_with_spacing_more_than_one()
        {
            var startLong = _monitor.StartTime.ToMilliseconds();
            _monitor.RegisterSentFromClientEvent(startLong + 100000, 10).Should().Be(10);
        }

        [Test]
        public void RegisterReceivedAtServerEvent_should_register_an_event_within_the_correct_interval()
        {
            var values = GetDummyMillisecondValues(200, 20);
            RegisterReceivedAtServerEvents(values);

            var expectedData = new[] { 4, 5, 5, 5, 1 };

            _monitor.ReceivedAtServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterReceivedAtServerEvent_should_register_an_event_also_with_different_spacing()
        {
            var values = GetDummyMillisecondValues(200, 40);
            RegisterReceivedAtServerEvents(values, 5);

            var expectedData = new[] { 24, 16 };
            _monitor.ReceivedAtServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterReceivedAtServerEvent_should_be_able_to_handle_large_dataSets()
        {
            var values = GetDummyMillisecondValues(100, 1000);
            RegisterReceivedAtServerEvents(values, 10);

            var expectedData = new[] { 99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1 };
            _monitor.ReceivedAtServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromServerEvent_should_register_an_echo_event_within_the_correct_interval()
        {
            _monitor.NumberOfClients = 100;
            var values = GetDummyMillisecondValues(200, 20);
            RegisterSentFromServerEvents(values, false);

            var expectedData = new[] { 4, 5, 5, 5, 1 };

            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromServerEvent_should_register_a_broadcast_event_within_the_correct_interval()
        {
            var values = GetDummyMillisecondValues(200, 20);
            RegisterSentFromServerEvents(values, true);

            var expectedData = new[] { 400, 500, 500, 500, 100 };

            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromServerEvent_should_register_an_echo_event_also_with_different_spacing()
        {
            var values = GetDummyMillisecondValues(200, 40);
            RegisterSentFromServerEvents(values, false, 5);

            var expectedData = new[] { 24, 16 };
            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromServerEvent_should_register_a_boradcast_event_also_with_different_spacing()
        {
            var values = GetDummyMillisecondValues(200, 40);
            RegisterSentFromServerEvents(values, true, 5);

            var expectedData = new[] { 2400, 1600 };
            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromServerEvent_should_be_able_to_handle_large_dataSets_with_echo()
        {
            var values = GetDummyMillisecondValues(100, 1000);
            RegisterSentFromServerEvents(values, false, 10);

            var expectedData = new[] { 99, 100, 100, 100, 100, 100, 100, 100, 100, 100, 1 };
            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void RegisterSentFromServerEvent_should_be_able_to_handle_large_dataSets_with_broadcast()
        {
            var values = GetDummyMillisecondValues(100, 1000);
            RegisterSentFromServerEvents(values, true, 10);

            var expectedData = new[] { 9900, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 100 };
            _monitor.SentFromServerEvents.ShouldAllBeEquivalentTo(expectedData);
        }

        [Test]
        public void AddEvent_should_fill_in_zero_events_if_key_points_to_an_out_of_bounds_index()
        {
            var eventStore = new List<int> {1, 2};
            _monitor.AddEvent(eventStore, 10);
            var expected = new[] {1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1};
            eventStore.ShouldAllBeEquivalentTo(expected);
        }

        private IEnumerable<long> GetDummyMillisecondValues(int eventInterval, int totalNumber)
        {
            var values = new List<long>();
            var startLong = _monitor.StartTime.ToMilliseconds();

            for (var i = 0; i < totalNumber; i++)
            {
                var value = startLong + eventInterval;
                startLong += eventInterval;
                values.Add(value);
            }

            return values;
        }

        private void RegisterSentFromClientEvents(IEnumerable<long> values, int spacing = 1)
        {
            foreach (var value in values)
            {
                _monitor.RegisterSentFromClientEvent(value, spacing);
            }
        }

        private void RegisterReceivedAtServerEvents(IEnumerable<long> values, int spacing = 1)
        {
            foreach (var value in values)
            {
                _monitor.RegisterReceivedAtServerEvent(value, spacing);
            }
        }

        private void RegisterSentFromServerEvents(IEnumerable<long> values, bool broadCast, int spacing = 1)
        {
            foreach (var value in values)
            {
                _monitor.RegisterSentFromServerEvent(value, broadCast, spacing);
            }
        }
    }
}
