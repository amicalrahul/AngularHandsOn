using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Entities
{
    public class Classroom
    {
        [JsonIgnore]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "Id")]
        public string ClassroomId { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "teacher")]
        public string Teacher { get; set; }
        [JsonProperty(PropertyName ="school_id")]
        public int SchoolId { get; set; }
    }
}
