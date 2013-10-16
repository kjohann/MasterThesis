using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using SignalR_Testapp.Database;
using SignalR_Testapp.Models;

namespace SignalR_Testapp.Hubs
{
    public class AuctionHub : Hub
    {
        private readonly AuctionHubService _service;

        public AuctionHub(IDataprovider provider)
        {
            _service = new AuctionHubService(provider);
        }

        public User Login(string username, string password)
        {
            return _service.VerifyLogin(username, password);
        }

        public IEnumerable<PrettyItem> GetAllItems()
        {
            return _service.GetAllItems();
        }

        public IEnumerable<ViewBid> GetUsersBids(long userID)
        {
            return _service.GetUsersBids(userID);
        }

        public bool Register(User user)
        {
            return _service.Register(user);
        }

        public void AddItem(Item item, string username)
        {
            var prettyItem = _service.AddItem(item, username);
            if(prettyItem != null)
                Clients.All.receiveItem(prettyItem);
        }

        public void PlaceBid(Bid newbid)
        {
            var returnBid = _service.PlaceBid(newbid);
            if (returnBid != null)
                Clients.All.receiveBid(returnBid);
        }

        public void DeleteItem(long itemno)
        {
            if (_service.DeleteItem(itemno))
                Clients.All.removeItem(itemno);
        }
    }
}