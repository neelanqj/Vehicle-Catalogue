using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpaVehicle.Controllers.Resources;
using SpaVehicle.Extensions;
using SpaVehicle.Models;

namespace SpaVehicle.Persistence
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated);

         Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}