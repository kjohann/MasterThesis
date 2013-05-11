namespace SignalR_Testapp.Models
{
    public class User
    {
        private long userID { get; set; }
        private string firstname { get; set; }
        private string lastname { get; set; }
        private string adress { get; set; }
        private string username { get; set; }
        private string password { get; set; }

        public User(long userID, string firstname, string lastname, string adress, string username, string password)
        {
            this.userID = userID;
            this.firstname = firstname;
            this.lastname = lastname;
            this.adress = adress;
            this.username = username;
            this.password = password;
        }
    }
}