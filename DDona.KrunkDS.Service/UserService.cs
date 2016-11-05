using DDona.KrunkDS.Data;
using DDona.KrunkDS.Util.Encryption;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.Service
{
    public class UserService : IUserService
    {
        public SingleResultViewModel<UserViewModel> CreateUser(UserViewModel Model)
        {
            SingleResultViewModel<UserViewModel> Result = new SingleResultViewModel<UserViewModel>();

            using (KrankContext _db = new KrankContext())
            {
                User User = new User
                {
                    IsActive = true,
                    Password = Encryption.CreateHash(Model.Password),
                    UserName = Model.UserName
                };

                try
                {
                    _db.User.Add(User);
                    _db.SaveChanges();
                }
                catch (Exception ex)
                {
                    Result.Success = false;
                    Result.Messages.Add(ex.Message);
                }
            }

            return Result;
        }

        public SingleResultViewModel<UserViewModel> GetByPassword(string UserName, string Password)
        {
            SingleResultViewModel<UserViewModel> Result = new SingleResultViewModel<UserViewModel>();

            using (KrankContext _db = new KrankContext())
            {
                User User = _db.User
                    .Where(x => x.UserName.Equals(UserName))
                    .FirstOrDefault();

                if(User == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Wrong Password or UserName does not exist");
                    return Result;
                }

                if(!Encryption.VerifyPassword(Password, User.Password))
                {
                    Result.Success = false;
                    Result.Messages.Add("Wrong Password or UserName does not exist");
                    return Result;
                }

                Result.ResultObject = new UserViewModel
                {
                    Id = User.Id,
                    IsActive = User.IsActive,
                    UserName = User.UserName
                };
            }

            return Result;
        }
    }
}
