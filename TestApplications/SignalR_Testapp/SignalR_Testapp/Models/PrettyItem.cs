using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR_Testapp.Models
{
    public class PrettyItem
    {
        public long itemno { get; set; }
        public string name { get; set; }
        public int price { get; set; }
        public long bid { get; set; }
        public DateTime expires { get; set; }
        public string description { get; set; }
        public long addedByID { get; set; }
        public string highestBidder { get; set; }
    }
}