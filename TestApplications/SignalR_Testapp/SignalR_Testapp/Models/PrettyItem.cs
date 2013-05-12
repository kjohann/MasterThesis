using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalR_Testapp.Models
{
    public class PrettyItem
    {
        private long _itemno;
        private string _name;
        private long _price;
        private long _bid;
        private DateTime _expires;
        private string _description;
        private long _addedByID;
        private string _highestBidder;

        public long itemno { get { return this._itemno; } set { this._itemno = value; } }
        public string name { get { return this._name; } set { this._name = value; } }
        public long price { get { return this._price; } set { this._price = value; } }
        public long bid { get { return this._bid; } set { this._bid = value; } }
        public DateTime expires { get { return this._expires; } set { this._expires = value; } }
        public string description { get { return this._description; } set { this._description = value; } }
        public long addedByID { get { return this._addedByID; } set { this._addedByID = value; } }
        public string highestBidder { get { return this._highestBidder; } set { this._highestBidder = value; } }
    }
}