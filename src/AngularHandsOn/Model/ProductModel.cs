using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    public class ProductModel
    {
        [JsonProperty(PropertyName = "productId")]
        public string ProductId { get; set; }

        [JsonProperty(PropertyName = "productCode")]
        public string ProductCode { get; set; }

        [JsonProperty(PropertyName = "productName")]
        public string ProductName { get; set; }

        [JsonProperty(PropertyName = "releaseDate")]
        public string ReleaseDate { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double? Price { get; set; }

        [JsonProperty(PropertyName = "cost")]
        public double? Cost { get; set; }

        [JsonProperty(PropertyName = "starRating")]
        public double? StarRating { get; set; }

        [JsonProperty(PropertyName = "imageUrl")]
        public string ImageUrl { get; set; }

        [JsonProperty(PropertyName = "tags")]
        public string[] Tags { get; set; }
    }
}
