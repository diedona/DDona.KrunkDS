using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Role;

namespace DDona.KrunkDS.Service
{
    public interface IRoleService
    {
        ListResultViewModel<RoleViewModel> GetAll();
    }
}