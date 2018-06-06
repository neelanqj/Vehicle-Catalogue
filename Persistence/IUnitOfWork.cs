using System.Threading.Tasks;

namespace SpaVehicle.Persistence
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}