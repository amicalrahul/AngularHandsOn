using AngularHandsOn.Filters;
using AngularHandsOn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Domain;

namespace AngularHandsOn.Controllers
{
    public class AuthController : Controller
    {
        private SignInManager<User> _signInManager;
        private ILogger<AuthController> _logger;
        private UserManager<User> _userMgr;
        private IPasswordHasher<User> _hasher;
        private IConfigurationRoot _config;

        public AuthController(SignInManager<User> signInManager, UserManager<User> userMgr,
      IPasswordHasher<User> hasher,
      ILogger<AuthController> logger,
      IConfigurationRoot config)
        {
            _signInManager = signInManager;
            _logger = logger;
            _userMgr = userMgr;
            _hasher = hasher;
            _config = config;
        }
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Schools", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginModel loginModel, string ReturnUrl)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(loginModel.Username, loginModel.Password, loginModel.RememberMe, false);

                if (result.Succeeded)
                {
                    if (string.IsNullOrWhiteSpace(ReturnUrl))
                    {
                        return RedirectToAction("Schools", "Home");
                    }
                    else
                    {
                        return Redirect(ReturnUrl);
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Username or Password is incorrect.");
                }
            }

            return View();
        }

        public async Task<ActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _signInManager.SignOutAsync();
            }
            return RedirectToAction("Index", "Home");
        }

        [ValidateModel]
        [HttpPost("api/auth/token")]
        public async Task<IActionResult> CreateToken([FromBody] CredentialModel model)
        {
            try
            {
                var user = await _userMgr.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    if (_hasher.VerifyHashedPassword(user, user.PasswordHash, model.Password) == PasswordVerificationResult.Success)
                    {
                        var userClaims = await _userMgr.GetClaimsAsync(user);

                        var claims = new[]
                        {
              new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
              new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
              new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
              new Claim(JwtRegisteredClaimNames.Email, user.Email)
            }.Union(userClaims);

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                          issuer: _config["Tokens:Issuer"],
                          audience: _config["Tokens:Audience"],
                          claims: claims,
                          expires: DateTime.UtcNow.AddMinutes(15),
                          signingCredentials: creds
                          );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        });
                    }
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown while creating JWT: {ex}");
            }

            return BadRequest("Failed to generate token");
        }
    }
}
