using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using SignalRLoad.Models;
using SignalRLoad.Utils;

namespace SignalRLoad.Controllers
{
    public class ChartsController : ApiController
    {
        public ChartsRepo ChartsRepo { get; set; }

        public ChartsController()
        {
            ChartsRepo = ChartsRepo.GetInstance();
        }

        public string Post(ChartPostModel model)
        {
            if (model.Type == "MessagesSentReceived")
            {
                ChartsRepo.Charts.Add(MessagesReceivedAtServerAndSentFromClientsPrSecond(model));
                return "Calculation complete for chart: " + model.Type;
            }
            else if (model.Type == "MessagesSentServer")
            {
                ChartsRepo.Charts.Add(MessagesSentFromServerPrSecond(model));
                return "Calculation complete for chart " + model.Type;
            }

            return null;
        }

        public IEnumerable<Chart> GetCharts()
        {
            var charts = ChartsRepo.Charts;
            ChartsRepo.Charts = new List<Chart>();
            return charts;
        } 

        private static Chart MessagesReceivedAtServerAndSentFromClientsPrSecond(ChartPostModel model)
        {
            var testData = new TestData
            {
                TestDataEntities = model.Entities,
                StartTime = DateUtils.FromMillisecondsSinceEpoch(model.StartTime)
            };

            return testData.MessagesReceivedAtServerAndSentFromClientsPrSecond(1, model.Duration, true);
        }

        private static Chart MessagesSentFromServerPrSecond(ChartPostModel model)
        {
            var testData = new TestData
            {
                SendEvents = model.SendEvents,
                StartTime = DateUtils.FromMillisecondsSinceEpoch(model.StartTime)
            };

            return testData.MessagesSentByServerPrSecond(1, model.Duration, true);
        }
    }
}
