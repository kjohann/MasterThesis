using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalRLoad.Hubs
{
    public class LoadHub : Hub
    {
        //Remove this..
        public void Hello()
        {
            Clients.All.hello();
        }

        public void InitTest(String testToRun, int numberOfClients)
        {
            //save numberOfClients
            Clients.All.initTest(testToRun);
        }

        //Echo and EchoBroadCast

        public void Complete(String clientID)
        {
            //register completed
            //if all are completed
            Clients.All.harvest(); //getData
        }

        public void GetData( /*Some object containting data*/)
        {
            //merge data into one entity and write to file (csv or something)
            Clients.All.harvestComplete( /*Dataobject (as JSON if needed)*/); //only the "master client" will get this.
        }

    }
}