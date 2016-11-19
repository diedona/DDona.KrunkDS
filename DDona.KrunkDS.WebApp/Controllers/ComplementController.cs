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
    [RoutePrefix("api/Complement")]
    public class ComplementController : ApiController
    {
        private IComplementService _complementService;

        public ComplementController(IComplementService complementService)
        {
            _complementService = complementService;
        }

        #region POST
        [HttpPost]
        [Route("DataTables")]
        public IHttpActionResult DataTables(DatatableViewModel Model)
        {
            return Ok(_complementService.GetComplements(Model));
        }
        #endregion
    }
}
