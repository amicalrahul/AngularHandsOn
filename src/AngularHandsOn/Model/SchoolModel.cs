using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    public class SchoolModel : IValidatableObject
    {
        [JsonProperty(PropertyName = "id")]
        public string SchoolId { get; set; }
        [Required]        
        [JsonProperty(PropertyName = "name")]
        [DataType(DataType.Custom,ErrorMessage ="",ErrorMessageResourceName ="")]
        public string Name { get; set; }
        [Required]
        [JsonProperty(PropertyName = "principal")]
        public string Principal { get; set; }
        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }

        /// <summary>
        /// When you need to validate one property using one or more properties in the same model.
        ///For.e.g.let's say you need to validate Property1 which is dependent on value of Property2.
        /// </summary>
        /// <param name="validationContext"></param>
        /// <returns></returns>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var pName = new[] { "Name" };
            if (Name.Contains("&")
            {
                yield return new ValidationResult("Name cannot contain '&'", pName);
            }
        }
    }
}
