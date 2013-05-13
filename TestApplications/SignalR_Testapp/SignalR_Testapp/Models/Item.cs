using System;

namespace SignalR_Testapp.Models
{
    public class Item
    {
        private long _itemno;
        private string _name;
        private int _price;
        private DateTime _expires;
        private string _description;
        private long _addedByID;

        public long itemno { get { return this._itemno; } set { this._itemno = value; } }
        public string name { get { return this._name; } set { this._name = value; } }
        public int price { get { return this._price; } set { this._price = value; } }
        public DateTime expires { get { return this._expires; } set { this._expires = value; } }
        public string description { get { return this._description; } set { this._description = value; } }
        public long addedByID { get { return this._addedByID; } set { this._addedByID = value; } }
    }
}