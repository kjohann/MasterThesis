using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using SignalRLoad.Controllers;
using SignalRLoad.Extensions;
using SignalRLoad.Models;

namespace SignalRLoadUnitTests
{
    [TestFixture]
    public class ChartsControllerTest
    {
        private readonly ChartsController _controller = new ChartsController();

        [SetUp]
        public void SetUp()
        {
            _controller.ChartsRepo.Charts = new List<Chart>();
        }

        [Test]
        public void Post_adds_MessagesSentReceived_chart_to_repo_and_returns_status()
        {
            var model = new ChartPostModel
            {
                Type = "MessagesSentReceived",
                StartTime = new DateTime().ToMilliseconds(),
                ReceivedAtServerEvents = GetDummyDataSet(100, 50),
                SentFromClientEvents = GetDummyDataSet(100, 50), 
                Spacing = 10
            };

            _controller.Post(model).Should().Be("Calculation complete for chart: " + model.Type);
        }

        [Test]
        public void Post_adds_MessagesSentServer_chart_to_repo_and_returns_status()
        {
            var model = new ChartPostModel
            {
                Type = "MessagesSentServer",
                StartTime = new DateTime().ToMilliseconds(),
                SentFromServerEvents = GetDummyDataSet(100, 300),
                Spacing = 10
            };

            _controller.Post(model).Should().Be("Calculation complete for chart " + model.Type);
        }

        [Test]
        public void Post_should_not_take_more_than_one_second_with_large_dataSets()
        {
            var model = new ChartPostModel
            {
                Type = "MessagesSentReceived",
                StartTime = new DateTime().ToMilliseconds(),
                ReceivedAtServerEvents = GetDummyDataSet(1000, 50),
                SentFromClientEvents = GetDummyDataSet(1000, 50),
                Spacing = 10
            };

            var stopwatch = new Stopwatch();
            stopwatch.Start();
            _controller.Post(model);
            stopwatch.Stop();

            stopwatch.ElapsedMilliseconds.Should().BeLessOrEqualTo(1000);
        }

        [Test]
        public void Post_should_return_null_on_unknown_chart_type()
        {
            var model = new ChartPostModel
            {
                Type = "IfIFitsISits"
            };

            _controller.Post(model).Should().BeNull();
        }

        [Test]
        public void GetCharts_should_return_all_charts_in_repo()
        {
            _controller.ChartsRepo.Charts.Add(new Chart{Title = "Chart1"});
            _controller.ChartsRepo.Charts.Add(new Chart { Title = "Chart2" });

            var charts = _controller.GetCharts();
            var enumerable = charts as IList<Chart> ?? charts.ToList();
            enumerable.Count().Should().Be(2);
            enumerable[0].Title.Should().Be("Chart1");
            enumerable[1].Title.Should().Be("Chart2");
        }

        [Test]
        public void GetCharts_should_reset_repo()
        {
            _controller.ChartsRepo.Charts.Add(new Chart { Title = "Chart1" });
            _controller.ChartsRepo.Charts.Add(new Chart { Title = "Chart2" });

            _controller.GetCharts();

            _controller.ChartsRepo.Charts.Count.Should().Be(0);
        }

        private static List<int> GetDummyDataSet(int length, int numberPrInterval)
        {
            var list = new List<int>();
            for (var i = 0; i < length; i++)
            {
                list.Add(numberPrInterval);
            }
            return list;
        }
    }
}
