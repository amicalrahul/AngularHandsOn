using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model.ApiModel
{
    public class AuthorForCreationModel
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public DateTimeOffset DateOfBirth { get; set; }
                
        public string Genre { get; set; }

        public ICollection<BookForCreationModel> Books { get; set; }
                                                        = new List<BookForCreationModel>();
    }
}
