using System;
using System.Collections.Generic;
using System.Linq;
using SignalR_Testapp.Models;

namespace SignalR_Testapp.Database
{
    public class Dataprovider
    {
        public User verifyLogin(string username, string password)
        {
            var db = new auctionhouseEntities();
            List<User> users = (from u in db.user
                                where u.Username.Equals(username) &&
                                u.Password.Equals(password)
                                select new User(u.UserID, u.Firstname, u.Lastname, u.Adress, u.Username, u.Password)).ToList();
            return users.Count > 1 ? null : users.FirstOrDefault();                          
        }
    }
}