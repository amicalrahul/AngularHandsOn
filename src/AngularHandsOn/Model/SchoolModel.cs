using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    public class SchoolModel
    {
        [JsonProperty(PropertyName = "id")]
        public string SchoolId { get; set; }
        [Required]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [Required]
        [JsonProperty(PropertyName = "principal")]
        public string Principal { get; set; }
        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }
    }
}
