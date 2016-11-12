using DDona.KrunkDS.Service;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace DDona.KrunkDS.WebApp.Infrastructure.Providers
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private IUserService _userService = null;

        public SimpleAuthorizationServerProvider(IUserService UserService)
        {
            _userService = UserService;
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var UserViewModel = _userService.GetByPassword(context.UserName, context.Password);
            if (!UserViewModel.Success)
            {
                context.SetError("invalid_grant", "UserName or Password incorrect.");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("UserName", UserViewModel.ResultObject.UserName));
            identity.AddClaim(new Claim("UserId", UserViewModel.ResultObject.Id.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Role, UserViewModel.ResultObject.RoleDescription));

            var props = new AuthenticationProperties(new Dictionary<string, string>
            {
                {"UserName", UserViewModel.ResultObject.UserName },
                {"UserRole", UserViewModel.ResultObject.RoleDescription }
            });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);

        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            string[] Keys = { "access_token", "UserName", "UserRole" };

            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                if (Keys.Contains(property.Key))
                {
                    context.AdditionalResponseParameters.Add(property.Key, property.Value);
                }
            }

            return Task.FromResult<object>(null);
        }
    }
}