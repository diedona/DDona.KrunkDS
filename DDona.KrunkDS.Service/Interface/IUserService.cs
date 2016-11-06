using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.User;

namespace DDona.KrunkDS.Service
{
    public interface IUserService
    {
        SingleResultViewModel<UserViewModel> CreateUser(UserViewModel Model);
        SingleResultViewModel<UserViewModel> GetByPassword(string UserName, string Password);
        DatatableReturnViewModel<UserViewModel> GetUsers(DatatableViewModel Model);
    }
}