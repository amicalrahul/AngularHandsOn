using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AngularHandsOn.Components
{
    [ViewComponent]
    public class AngularMenu: ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            await Task.FromResult(0);
            return View();
        }
    }
}
