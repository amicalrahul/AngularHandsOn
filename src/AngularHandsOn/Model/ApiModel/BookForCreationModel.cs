using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model.ApiModel
{
    public class BookForCreationModel
    {
        /// <summary>
        /// No Need for Author Id here as that'll be passed in the request url
        /// and adding that here would mean that we have to add extra check to match the author id  
        /// in url and request payload
        /// </summary>
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
