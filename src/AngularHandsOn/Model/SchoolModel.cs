using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public sealed class CannotBeRedAttribute : ValidationAttribute, IClientModelValidator
    {
        public override bool IsValid(object value)
        {
            var message = value as string;
            return message?.ToUpper() == "RED";
        }

        public void AddValidation(ClientModelValidationContext context)
        {
            MergeAttribute(context.Attributes, "data-val", "true");
            var errorMessage = FormatErrorMessage(context.ModelMetadata.GetDisplayName());
            MergeAttribute(context.Attributes, "data-val-cannotbered", ErrorMessage);
        }

        private bool MergeAttribute(
            IDictionary<string, string> attributes,
            string key,
            string value)
        {
            if (attributes.ContainsKey(key))
            {
                return false;
            }
            attributes.Add(key, value);
            return true;
        }
    }
    public class SchoolModel : IValidatableObject
    {
        [JsonProperty(PropertyName = "id")]
        public string SchoolId { get; set; }
                
        [JsonProperty(PropertyName = "name")]
        [Required]
        [StringLength(50, MinimumLength = 3)]
        [Remote("IsSchoolName_Available", "Validation")]
        //[RegularExpression(@"(\S)+", ErrorMessage = "White space is not allowed.")]
        [Editable(true)]
        public string Name { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        [JsonProperty(PropertyName = "principal")]
        [CannotBeRed(ErrorMessage = "Red is not allowed!")]
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
            if (Name.Contains("&"))
            {
                yield return new ValidationResult("Name cannot contain '&'", pName);
            }
        }
    }
}
