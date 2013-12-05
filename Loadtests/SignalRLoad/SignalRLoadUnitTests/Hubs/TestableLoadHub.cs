using System.Security.Principal;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Configuration;
using Microsoft.AspNet.SignalR.Hubs;
using Moq;
using SignalRLoad.Hubs;

namespace SignalRLoadUnitTests.Hubs
{
    //Found at: http://software.intel.com/en-us/blogs/2013/09/25/unit-testing-on-signalr-hubs-with-20-rc1
    public class TestableLoadHub : LoadHub
    {
        public IConfigurationManager Config;

        public TestableLoadHub()
        {
            const string connectionId = "1234";
            const string hubName = "LoadHub";
            var resolver = new DefaultDependencyResolver();
            Config = resolver.Resolve<IConfigurationManager>();

            var mockConnection = new Mock<IConnection>();
            var mockUser = new Mock<IPrincipal>();
            var mockHubPipelineInvoker = new Mock<IHubPipelineInvoker>();

            var mockRequest = new Mock<IRequest>();
            mockRequest.Setup(r => r.User).Returns(mockUser.Object);

            var tracker = new StateChangeTracker();

            Clients = new HubConnectionContext(mockHubPipelineInvoker.Object, mockConnection.Object, hubName, connectionId, tracker);
            Context = new HubCallerContext(mockRequest.Object, connectionId);
        }
    }
}
