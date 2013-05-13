using SignalR_Testapp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR_Testapp.Database
{
    public interface IDataprovider
    {
        User verifyLogin(string username, string password);
        IEnumerable<PrettyItem> getAllItems();
        IEnumerable<ViewBid> getUsersBids(long userID);
        bool register(User user);
        PrettyItem addItem(Item item, string username);
        bool deleteItem(long itemno);
        Bid placeBid(Bid newbid);
    }
}
