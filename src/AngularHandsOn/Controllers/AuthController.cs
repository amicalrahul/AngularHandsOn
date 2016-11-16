using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Controllers
{
    public class AuthController : Controller
    {
        private SignInManager<User> _signInManager;

        public AuthController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }
        public IActionResult Login()
        {
            if(User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Schools", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginModel loginModel, string ReturnUrl)
        {
            if(ModelState.IsValid)
            {
                var result =  await _signInManager.PasswordSignInAsync(loginModel.Username, loginModel.Password, true, false);

                if(result.Succeeded)
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
    }
}
