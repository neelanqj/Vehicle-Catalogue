using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaVehicle.Controllers.Resources;
using SpaVehicle.Models;
using SpaVehicle.Persistence;

namespace SpaVehicle.Controllers
{
    public class MakesController : Controller
    {
        private readonly SpaVehicleDbContext context;
        private readonly IMapper mapper;

        public MakesController(SpaVehicleDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await context.Makes.Include(m => m.Models).ToListAsync();
            return mapper.Map<List<Make>,List<MakeResource>>(makes);
        }
    }
}