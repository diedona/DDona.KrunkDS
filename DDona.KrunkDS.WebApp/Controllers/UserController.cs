using DDona.KrunkDS.Service;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DDona.KrunkDS.WebApp.Controllers
{
    [Authorize]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private IUserService _userService = null;

        public UserController()
        {
            _userService = new UserService();
        }

        #region POST
        [HttpPost]
        [Route("DataTables")]
        public IHttpActionResult DataTables(DatatableViewModel Model)
        {
            return Ok(_userService.GetUsers(Model));
        }
        #endregion
    }
}
