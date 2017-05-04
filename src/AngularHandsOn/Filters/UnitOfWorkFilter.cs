
using AngularHandsOn.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;

namespace AngularHandsOn.Filters
{

    public class UnitOfWorkFilter : ActionFilterAttribute
    {
        private readonly AngularDbContext _dbContext;
        private readonly ILogger _logger;

        public UnitOfWorkFilter(AngularDbContext dbContext, ILoggerFactory loggerFactory)
        {
            _dbContext = dbContext;
            _logger = loggerFactory.CreateLogger<UnitOfWorkFilter>();
        }


        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (!context.HttpContext.Request.Method.Equals("Post", StringComparison.OrdinalIgnoreCase))
                return;
            try
            {

                if (context.Exception == null && context.ModelState.IsValid)
                {
                    _logger.LogInformation("Saving changes for unit of work");
                    _dbContext.Database.CommitTransaction();
                }
                else
                {
                    _dbContext.Database.RollbackTransaction();
                    _logger.LogInformation("Avoid to save changes for unit of work due an exception");
                }
            }
            catch (Exception)
            {
                //don't do anything here
                // ignore the exception
            }
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.HttpContext.Request.Method.Equals("Post", StringComparison.OrdinalIgnoreCase))
                return;

            _logger.LogInformation("Saving changes for unit of work");
            _dbContext.Database.BeginTransaction();
        }

        /// <summary>
        /// The same result can be achived using async call as well
        /// The framework will check to see if the filter implements the async interface first, 
        /// and if so, it will call it. If not, it will call the synchronous interface's method(s). 
        /// If you were to implement both interfaces on one class, only the async method would be called by the framework.
        /// So commenting the async call
        /// </summary>
        //public override async Task OnActionExecutionAsync(ActionExecutingContext executingContext, ActionExecutionDelegate next)
        //{
        //    if (executingContext.HttpContext.Request.Method.Equals("Post", StringComparison.OrdinalIgnoreCase))
        //       await _dbContext.Database.BeginTransactionAsync();

        //    var executedContext = await next.Invoke(); //to wait until the controller's action finalizes in case there was an error

        //    if (!executedContext.HttpContext.Request.Method.Equals("Post", StringComparison.OrdinalIgnoreCase))
        //        return;

        //     if (executedContext.Exception == null && executedContext.ModelState.IsValid)
        //    {
        //        _logger.LogInformation("Saving changes for unit of work");
        //        _dbContext.Database.CommitTransaction();
        //    }
        //    else
        //    {
        //        _dbContext.Database.RollbackTransaction();
        //        _logger.LogInformation("Avoid to save changes for unit of work due an exception");
        //    }
        //}
    }
}
