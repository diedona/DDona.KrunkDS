using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DDona.KrunkDS.WebApp.Controllers
{
    [Authorize]
    [RoutePrefix("api/Ping")]
    public class PingController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok(true);
        }
    }
}
