using AngularHandsOn.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Model
{
    public class ModelMappingProfile : Profile
    {
        public ModelMappingProfile()
        {
            #region Automapper Mappings Defined
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<SchoolModel, School>().ReverseMap();
                cfg.CreateMap<ClassroomModel, Classroom>().ReverseMap();
                cfg.CreateMap<ActivityModel, Activity>().ReverseMap();
                cfg.CreateMap<ProductModel, Product>()
                    .ForMember(dest => dest.Tags,
                        opt => opt.MapFrom
                        (src => ConvertArrayToString(src.Tags)))
                .ReverseMap()
                    .ForMember(dest => dest.Tags,
                        opt => opt.MapFrom
                        (src => ConvertStringToArray(src.Tags)));
            });
            #endregion
        }
        private string ConvertArrayToString(string[] strArr)
        {
            if (strArr == null)
                return string.Empty;
            return String.Join(",", strArr);
        }
        private string[] ConvertStringToArray(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return null;
            }
            return str.Split(',');
        }

    }
}
