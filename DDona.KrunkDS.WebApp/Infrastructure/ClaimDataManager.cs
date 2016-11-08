using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace DDona.KrunkDS.WebApp.Infrastructure
{
    public class ClaimDataManager
    {
        private ClaimsPrincipal _claimsPrincipal;

        public ClaimDataManager(ClaimsPrincipal Claims)
        {
            _claimsPrincipal = Claims;
        }

        public int GetUserId()
        {
            Claim UserIdClaim = _claimsPrincipal.FindFirst("UserId");
            if(UserIdClaim != null)
            {
                return int.Parse(UserIdClaim.Value);
            }
            else
            {
                return -1;
            }
        }

        public string GetUserName()
        {
            Claim UserNameClaim = _claimsPrincipal.FindFirst("UserName");
            if (UserNameClaim != null)
            {
                return UserNameClaim.Value;
            }
            else
            {
                return string.Empty;
            }
        }
    }
}