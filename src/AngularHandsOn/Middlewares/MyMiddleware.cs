
using AngularHandsOn.Data;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace AngularHandsOn.Middlewares
{
    /// <summary>
    /// Middleware added for example only
    /// </summary>
    public class MyMiddleware
    {
        private AngularDbContext _dbContext;
        private RequestDelegate _next;

        public MyMiddleware(RequestDelegate next, AngularDbContext dbContext)
        {
            _next = next;
            _dbContext = dbContext;
        }

        public async Task Invoke(HttpContext context)
        {            
            await _next.Invoke(context);
        }

    }
}
