using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Entities
{
    public class Activity
    {
        [JsonIgnore]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "activity_id")]
        public string ActivityId { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "principal")]
        public string Principal { get; set; }
        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }
        [JsonProperty(PropertyName = "classroom_id")]
        public string ClassroomId { get; set; }
        [JsonProperty(PropertyName = "school_id")]
        public string SchoolId { get; set; }

    }
}
