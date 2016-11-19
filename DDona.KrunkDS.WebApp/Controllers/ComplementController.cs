using DDona.KrunkDS.Service;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Complement;
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
        public IHttpActionResult Post(ComplementViewModel Model)
        {
            return Ok(_complementService.SaveComplement(Model));
        }

        [HttpPost]
        [Route("DataTables")]
        public IHttpActionResult DataTables(DatatableViewModel Model)
        {
            return Ok(_complementService.GetComplements(Model));
        }
        #endregion

        #region PUT
        [HttpPut]
        public IHttpActionResult Put(ComplementViewModel Model)
        {
            return Ok(_complementService.UpdateComplement(Model));
        }
        #endregion

        #region DELETE
        [HttpDelete]
        public IHttpActionResult Delete(int Id)
        {
            return Ok(_complementService.DeleteComplement(Id));
        }
        #endregion
    }
}
