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
        SingleResultViewModel<UserViewModel> GetById(int Id);
        SingleResultViewModel<bool> UpdateReceiveNotification(int Id, bool Status);
        SingleResultViewModel<bool> SaveUser(UserViewModel Model);
        SingleResultViewModel<bool> UpdateUser(UserViewModel Model);
        SingleResultViewModel<bool> DeleteUser(int Id);
        SingleResultViewModel<bool> UpdateProfilePicture(int Id, UserViewModel Model);
        SingleResultViewModel<string> GetUserProfilePicture(int Id);
        SingleResultViewModel<bool> UpdateUserEmail(ChangeEmailViewModel Model);
    }
}