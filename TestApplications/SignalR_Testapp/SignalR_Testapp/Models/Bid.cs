namespace SignalR_Testapp.Models
{
    public class Bid
    {
        private long _bidID;
        private long _itemno;
        private long _userID;
        private long _value;
        private string _username;

        public long bidID { get { return this._bidID; } set { this._bidID = value; } }
        public long itemno { get { return this._itemno; } set { this._itemno = value; } }
        public long userID { get { return this._userID; } set { this._userID = value; } }
        public long value { get { return this._value; } set { this._value = value; } }
        public string username { get { return this._username; } set { this._username = value; } }
    }
}