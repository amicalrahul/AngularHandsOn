using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Entities
{
    public class Classroom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "Id")]
        public int ClassroomId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "teacher")]
        public string Teacher { get; set; }
        [ForeignKey("SchoolId")]
        public School School { get; set; }

        [JsonProperty(PropertyName = "school_id")]
        public int? SchoolId { get; set; }

        public virtual ICollection<Activity> Activity { get; set; }
               = new List<Activity>();
    }
}
