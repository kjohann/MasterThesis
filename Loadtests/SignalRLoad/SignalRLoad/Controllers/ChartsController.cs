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
        public Chart Post(ChartPostModel model)
        {
            //need to send dates as milliseconds since 1970!
           // var model = JsonConvert.DeserializeObject<ChartPostModel>(json);
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
                TestDataEntities = model.Entities,
                StartTime = new DateTime(model.StartTime)
            };

            return testData.MessagesReceivedAtServerAndSentFromClientsPrSecond(1, model.Duration, true);
        }
    }
}
