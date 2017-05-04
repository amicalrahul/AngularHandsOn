using AngularHandsOn.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    public class ActivityModel
    {
        [JsonProperty(PropertyName = "activity_id")]
        public string ActivityId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "principal")]
        public string Principal { get; set; }

        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }

        [JsonProperty(PropertyName = "school")]
        public School School { get; set; }

        [JsonProperty(PropertyName = "classroom")]
        public Classroom Classroom { get; set; }


        [JsonProperty(PropertyName = "school_id")]
        public int? SchoolId { get; set; }

        [JsonProperty(PropertyName = "classroom_id")]
        public int? ClassroomId { get; set; }
    }
}
