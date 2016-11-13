using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.User
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool ReceiveNotification { get; set; }
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
        public string RoleDescription { get; set; }
        public string ProfilePicture { get; set; }
        public string ProfilePictureBase64 { get; set; }
        public string Actions { get; set; }
    }
}
