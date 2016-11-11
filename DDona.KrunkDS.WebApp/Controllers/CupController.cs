using DDona.KrunkDS.Service;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Cup;
using DDona.KrunkDS.WebApp.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DDona.KrunkDS.WebApp.Controllers
{
    [Authorize]
    [RoutePrefix("api/Cup")]
    public class CupController : ApiController
    {
        private ICupService _cupService;

        public CupController(ICupService CupService)
        {
            _cupService = CupService;
        }

        #region GET
        public IHttpActionResult Get(int Id)
        {
            return Ok(_cupService.GetById(Id));
        }
        #endregion

        #region POST
        [HttpPost]
        public IHttpActionResult Post(CupViewModel Model)
        {
            return Ok(_cupService.SaveCup(Model));
        }

        [HttpPost]
        [Route("DataTables")]
        public IHttpActionResult DataTables(DatatableViewModel Model)
        {
            return Ok(_cupService.GetCups(Model));
        }
        #endregion

        #region PUT
        [HttpPut]
        public IHttpActionResult Put(CupViewModel Model)
        {
            return Ok(_cupService.UpdateCup(Model));
        }
        #endregion

        #region DELETE
        [HttpDelete]
        public IHttpActionResult Delete(int Id)
        {
            return Ok(_cupService.DeleteCup(Id));
        }
        #endregion
    }
}
