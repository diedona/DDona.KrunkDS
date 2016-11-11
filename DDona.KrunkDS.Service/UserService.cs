using DDona.KrunkDS.Data;
using DDona.KrunkDS.Util.Encryption;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Data.Entity;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.Service
{
    public class UserService : IUserService
    {
        public SingleResultViewModel<UserViewModel> CreateUser(UserViewModel Model)
        {
            SingleResultViewModel<UserViewModel> Result = new SingleResultViewModel<UserViewModel>();

            using (KrunkContext _db = new KrunkContext())
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

            using (KrunkContext _db = new KrunkContext())
            {
                User User = _db.User
                    .Include(x => x.Role)
                    .Where(x => x.UserName.Equals(UserName))
                    .FirstOrDefault();

                if (User == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Wrong Password or UserName does not exist");
                    return Result;
                }

                if (!Encryption.VerifyPassword(Password, User.Password))
                {
                    Result.Success = false;
                    Result.Messages.Add("Wrong Password or UserName does not exist");
                    return Result;
                }

                Result.ResultObject = new UserViewModel
                {
                    Id = User.Id,
                    IsActive = User.IsActive,
                    UserName = User.UserName,
                    RoleDescription = User.Role.Description
                };
            }

            return Result;
        }

        public DatatableReturnViewModel<UserViewModel> GetUsers(DatatableViewModel Model)
        {
            DatatableReturnViewModel<UserViewModel> Result = new DatatableReturnViewModel<UserViewModel>();

            int recordsFiltered = 0;
            int recordsTotal = 0;

            using (KrunkContext _db = new KrunkContext())
            {
                IQueryable<User> User = _db.User.AsQueryable();

                recordsTotal = User.Count();

                // DO FILTERING
                if (!string.IsNullOrEmpty(Model.value))
                {
                    User = User.Where(x =>
                        x.Email.Contains(Model.value)
                        ||
                        x.UserName.Contains(Model.value)
                    );
                }

                recordsFiltered = User.Count();

                // DYNAMIC ORDER BY
                User = User.OrderBy(Model.OrderColumn);

                // SKIP / TAKE
                User = User.Skip(Model.start).Take(Model.length);

                // SELECT DATA
                Result.data = User.Select(x => new UserViewModel
                {
                    Email = x.Email,
                    IsActive = x.IsActive,
                    UserName = x.UserName,
                    Id = x.Id
                }).ToArray();
            }

            Result.draw = Model.draw;
            Result.recordsFiltered = recordsFiltered;
            Result.recordsTotal = recordsTotal;

            return Result;
        }

        public SingleResultViewModel<UserViewModel> GetById(int Id)
        {
            SingleResultViewModel<UserViewModel> Result = new SingleResultViewModel<UserViewModel>();

            using (KrunkContext _db = new KrunkContext())
            {
                User User = _db.User
                    .Where(x => x.Id == Id)
                    .FirstOrDefault();

                if(User == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não existente");
                    return Result;
                }

                Result.ResultObject = new UserViewModel()
                {
                    Email = User.Email,
                    Id = User.Id,
                    ReceiveNotification = User.ReceiveNotification,
                    UserName = User.UserName,
                    IsActive = User.IsActive
                };
            }

            return Result;
        }

        public SingleResultViewModel<bool> UpdateReceiveNotification(int Id, bool Status)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                User User = _db.User
                    .Where(x => x.Id == Id)
                    .FirstOrDefault();

                if (User == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não existente");
                    return Result;
                }

                User.ReceiveNotification = Status;

                try
                {
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
    }
}
