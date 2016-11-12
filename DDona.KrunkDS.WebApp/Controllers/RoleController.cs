using DDona.KrunkDS.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DDona.KrunkDS.WebApp.Controllers
{
    [Authorize(Roles = "Administrador")]
    [RoutePrefix("api/Role")]
    public class RoleController : ApiController
    {
        private IRoleService _roleService;

        public RoleController(IRoleService RoleService)
        {
            _roleService = RoleService;
        }

        #region GET
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_roleService.GetAll());
        }
        #endregion
    }
}
