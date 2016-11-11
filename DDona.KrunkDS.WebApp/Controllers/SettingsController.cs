using DDona.KrunkDS.Service;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DDona.KrunkDS.WebApp.Controllers
{
    [Authorize]
    [RoutePrefix("api/Settings")]
    public class SettingsController : ApiController
    {
        private ISettingsService _settingsService;

        public SettingsController(ISettingsService SettingsService)
        {
            _settingsService = SettingsService;
        }

        #region POST
        [HttpPost]
        public IHttpActionResult Post(SettingsViewModel Model)
        {
            return Ok(_settingsService.SaveSettings(Model));
        }

        [HttpPost]
        [Route("DataTables")]
        public IHttpActionResult DataTables(DatatableViewModel Model)
        {
            return Ok(_settingsService.GetSettings(Model));
        }
        #endregion

        #region PUT
        [HttpPut]
        public IHttpActionResult Put(SettingsViewModel Model)
        {
            return Ok(_settingsService.UpdateSettings(Model));
        }
        #endregion

        #region DELETE
        [HttpDelete]
        public IHttpActionResult Delete(int Id)
        {
            return Ok(_settingsService.DeleteSettings(Id));
        }
        #endregion
    }
}
