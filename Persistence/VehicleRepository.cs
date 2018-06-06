using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpaVehicle.Controllers.Resources;
using SpaVehicle.Extensions;
using SpaVehicle.Models;

namespace SpaVehicle.Persistence
{
    public class VehicleRepository: IVehicleRepository
    {
        private readonly SpaVehicleDbContext context;
        public VehicleRepository(SpaVehicleDbContext context)
        {
            this.context = context;

        }
        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj){
            var result = new QueryResult<Vehicle>();
            var query = context.Vehicles            
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                    .AsQueryable();

            if (queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            if (queryObj.ModelId.HasValue)
                query = query.Where(v => v.ModelId == queryObj.ModelId.Value);
                
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle,object>>>()
            {
                ["make"] = x=>x.Model.Make.Name,
                ["model"] = x=>x.Model.Name,
                ["contactName"] = x=>x.ContactName
            };
            
            //query = ApplyOrdering(queryObj,query,columnsMap);
            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated)
        {
            if(!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                        .Include(v => v.Features)
            .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
            .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle){
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle){
            context.Remove(vehicle);
        }

    }
}