using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using SignalRLoad.Models;

namespace SignalRLoad.Controllers
{
    public class ChartsController : ApiController
    {
        public Chart Post(string json)
        {
            var model = JsonConvert.DeserializeObject<ChartPostModel>(json);
            if (model.Type == "Messages")
            {
                return MessagesReceivedAtServerAndSentFromClientsPrSecond(model);
            }

            return null;
        }

        private Chart MessagesReceivedAtServerAndSentFromClientsPrSecond(ChartPostModel model)
        {
            var testData = new TestData
            {
                TestDataEntities = (List<TestDataEntity>) model.TestDataEntities,
                StartTime = model.StartTime
            };

            return testData.MessagesReceivedAtServerAndSentFromClientsPrSecond(1, model.Duration, true);
        }
    }
}
