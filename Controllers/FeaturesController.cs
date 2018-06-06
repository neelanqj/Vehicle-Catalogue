using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaVehicle.Controllers.Resources;
using SpaVehicle.Models;
using SpaVehicle.Persistence;

namespace SpaVehicle.Controllers
{
  public class FeaturesController : Controller
  {
    private readonly SpaVehicleDbContext context;
    private readonly IMapper mapper;
    public FeaturesController(SpaVehicleDbContext context, IMapper mapper)
    {
      this.mapper = mapper;
      this.context = context;
    }

    [HttpGet("/api/features")]
    public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
    {
      var features = await context.Features.ToListAsync();
      
      return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features); 
    }
  }
}