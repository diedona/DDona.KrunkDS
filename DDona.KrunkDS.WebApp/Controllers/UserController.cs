using DDona.KrunkDS.Service;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.WebApp.Infrastructure;
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
        private IUserService _userService;

        public UserController(IUserService UserService)
        {
            _userService = UserService;
        }

        #region GET
        [HttpGet]
        public IHttpActionResult Get()
        {
            int Id = new ClaimDataManager(User).GetUserId();
            return Ok(_userService.GetById(Id));
        }
        #endregion

        #region POST
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        [Route("DataTables")]
        public IHttpActionResult DataTables(DatatableViewModel Model)
        {
            return Ok(_userService.GetUsers(Model));
        }
        #endregion

        #region PUT
        [HttpPut]
        [Route("UpdateReceiveNotification")]
        public IHttpActionResult UpdateReceiveNotification(bool Status)
        {
            int Id = new ClaimDataManager(User).GetUserId();
            return Ok(_userService.UpdateReceiveNotification(Id, Status));
        }
        #endregion
    }
}
