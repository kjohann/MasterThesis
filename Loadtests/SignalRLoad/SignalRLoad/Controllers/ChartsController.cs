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
            if (model.Type == "Messages")
            {
                ChartsRepo.Charts.Add(MessagesReceivedAtServerAndSentFromClientsPrSecond(model));
                return "Calculation complete for chart: " + model.Type;
            }

            return null;
        }

        public IEnumerable<Chart> GetCharts()
        {
            return ChartsRepo.Charts;
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
    }
}
