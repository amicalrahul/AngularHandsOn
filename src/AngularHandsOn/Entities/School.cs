using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Entities
{
    public class School
    {
        [JsonIgnore]
        public int Id { get; set; }
            
        [JsonProperty(PropertyName = "Id")]
        public string SchoolId { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "principal")]
        public string Principal { get; set; }
        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }        
    }
}
