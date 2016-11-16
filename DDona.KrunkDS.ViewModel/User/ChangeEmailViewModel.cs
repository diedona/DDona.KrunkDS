using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.User
{
    public class ChangeEmailViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string NewEmail { get; set; }
        public string ConfirmEmail { get; set; }
    }
}
