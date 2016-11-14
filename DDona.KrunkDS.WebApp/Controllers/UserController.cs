using DDona.KrunkDS.Service;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.User;
using DDona.KrunkDS.WebApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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

        [HttpGet]
        [Route("GetLoggedUserPhoto")]
        public IHttpActionResult GetLoggedUserPhoto()
        {
            int Id = new ClaimDataManager(User).GetUserId();
            return Ok(_userService.GetUserProfilePicture(Id));
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

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IHttpActionResult Post(UserViewModel Model)
        {
            return Ok(_userService.SaveUser(Model));
        }
        #endregion

        #region PUT
        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public IHttpActionResult Put(UserViewModel Model)
        {
            return Ok(_userService.UpdateUser(Model));
        }

        [HttpPut]
        [Route("UpdateReceiveNotification")]
        public IHttpActionResult UpdateReceiveNotification(bool Status)
        {
            int Id = new ClaimDataManager(User).GetUserId();
            return Ok(_userService.UpdateReceiveNotification(Id, Status));
        }

        [HttpPut]
        [Route("UpdateProfilePicture")]
        public IHttpActionResult UpdateProfilePicture(UserViewModel Model)
        {
            int Id = new ClaimDataManager(User).GetUserId();
            return Ok(_userService.UpdateProfilePicture(Id, Model));
        }
        #endregion

        #region DELETE
        [Authorize(Roles = "Administrador")]
        [HttpDelete]
        public IHttpActionResult Delete(int Id)
        {
            return Ok(_userService.DeleteUser(Id));
        }
        #endregion
    }
}
