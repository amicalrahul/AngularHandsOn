using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model.ApiModel
{
    public class BookForManipulationDto
    {
        /// <summary>
        /// No Need for Author Id here as that'll be passed in the request url
        /// and adding that here would mean that we have to add extra check to match the author id  
        /// in url and request payload
        /// </summary>
        [Required(ErrorMessage = "You should fill out a title.")]
        [MaxLength(100, ErrorMessage = "The title shouldn't have more than 100 characters.")]
        public string Title { get; set; }

        [MaxLength(500, ErrorMessage = "The description shouldn't have more than 500 characters.")]
        public virtual string Description { get; set; }
    }
}
