using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR_Testapp.Database;
using SignalR_Testapp.Models;

namespace SignalR_Testapp.Hubs
{
    public class AuctionHub : Hub
    {
        private AuctionHubService _service;
        private IDataprovider _provider;

        public AuctionHub()
        {
            _provider = new Dataprovider();
            _service = new AuctionHubService(_provider);
        }

        public User login(string username, string password)
        {
            return _service.verifyLogin(username, password);
        }

        public IEnumerable<PrettyItem> getAllItems()
        {
            return _service.getAllItems();
        }

        public IEnumerable<ViewBid> getUsersBids(long userID)
        {
            return _service.getUsersBids(userID);
        }

        public bool register(User user)
        {
            return _service.register(user);
        }

        public void addItem(Item item, string username)
        {
            PrettyItem prettyItem = _service.addItem(item, username);
            if(prettyItem != null)
                Clients.All.receiveItem(prettyItem);
        }

        public void placeBid(Bid newbid)
        {
            Bid returnBid = _service.placeBid(newbid);
            if (returnBid != null)
                Clients.All.receiveBid(returnBid);
        }

        public void deleteItem(long itemno)
        {
            if (_service.deleteItem(itemno))
                Clients.All.removeItem(itemno);
        }
    }
}