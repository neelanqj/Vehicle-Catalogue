using System.Collections.Generic;
using System.Threading.Tasks;
using SpaVehicle.Models;

namespace SpaVehicle.Persistence
{
    public interface IPhotoRepository
    {
         Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}