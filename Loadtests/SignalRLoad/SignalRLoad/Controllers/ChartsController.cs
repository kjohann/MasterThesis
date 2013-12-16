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
        //ChartsPostModel should receive data series in some fashion - can probalby do static.
        public ChartsRepo ChartsRepo { get; set; }

        public ChartsController()
        {
            ChartsRepo = ChartsRepo.GetInstance();
        }

        public string Post(ChartPostModel model)
        {
            switch (model.Type)
            {
                case "MessagesSentReceived":
                    ChartsRepo.Charts.Add(MessagesReceivedAtServerAndSentFromClientsPrSecond(model));
                    return "Calculation complete for chart: " + model.Type;
                case "MessagesSentServer":
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
                StartTime = DateUtils.FromMillisecondsSinceEpoch(model.StartTime)
            };
            //decide spacing from clientside
            return testData.MessagesReceivedAtServerAndSentFromClientsPrSecond(model.Spacing, model.ReceivedAtServerEvents.ToArray(),
                model.SentFromClientEvents.ToArray());
        }

        private static Chart MessagesSentFromServerPrSecond(ChartPostModel model)
        {
            var testData = new TestData
            {
                StartTime = DateUtils.FromMillisecondsSinceEpoch(model.StartTime)
            };

            return testData.MessagesSentByServerPrSecond(model.Spacing, model.SentFromServerEvents.ToArray());
        }
    }
}
