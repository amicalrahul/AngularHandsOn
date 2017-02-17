using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    public class BookModel
    {

        [JsonIgnore]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "book_id")]
        public int Bookid { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "author")]
        public string Author { get; set; }
        [JsonProperty(PropertyName = "year_published")]
        public int YearPublished { get; set; }
    }
}
