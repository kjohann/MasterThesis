using System;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;
using SignalR_Testapp.Database;
using SignalR_Testapp.Hubs;

namespace SignalR_Testapp
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalHost.DependencyResolver.Register(typeof(AuctionHub), () => new AuctionHub(new Dataprovider()));
            RouteTable.Routes.MapHubs();
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}