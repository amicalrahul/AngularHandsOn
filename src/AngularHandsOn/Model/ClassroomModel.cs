﻿using AngularHandsOn.Domain;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AngularHandsOn.Model
{
    public class ClassroomModel
    {

        [JsonProperty(PropertyName = "id")]
        public string ClassroomId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "teacher")]
        public string Teacher { get; set; }


        [JsonProperty(PropertyName = "school")]
        public School School { get; set; }

        [JsonProperty(PropertyName = "school_id")]
        public int? SchoolId { get; set; }

        [JsonProperty(PropertyName = "activity")]
        public ICollection<Activity> Activity { get; set; }
    }
}
