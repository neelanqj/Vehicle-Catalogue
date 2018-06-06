using System;
using System.Threading.Tasks;

namespace SpaVehicle.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SpaVehicleDbContext context;
        public UnitOfWork(SpaVehicleDbContext context)
        {
            this.context = context;

        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}