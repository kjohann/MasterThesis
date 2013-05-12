namespace SignalR_Testapp.Models
{
    public class User
    {
        private long _userID;
        private string _firstname;
        private string _lastname;
        private string _adress;
        private string _username;
        private string _password;

        public long userID { get { return this._userID; } set { this._userID = value; } }
        public string firstname { get { return this._firstname; } set { this._firstname = value; } }
        public string lastname { get { return this._lastname; } set { this._lastname = value; } }
        public string adress { get { return this._adress; } set { this._adress = value; } }
        public string username { get { return this._username; } set { this._username = value; } }
        public string password { get { return this._password; } set { this._password = value; } }
    }
}