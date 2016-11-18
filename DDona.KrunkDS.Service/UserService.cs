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
using DDona.KrunkDS.ViewModel.Settings;
using DDona.KrunkDS.Util.Blob;

namespace DDona.KrunkDS.Service
{
    public class UserService : IUserService
    {
        private ISettingsService _settingsService;

        public UserService(ISettingsService SettingsService)
        {
            _settingsService = SettingsService;
        }

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
                IQueryable<User> User = _db.User
                    .Include(x => x.Role)
                    .AsQueryable();

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
                    Id = x.Id,
                    ReceiveNotification = x.ReceiveNotification,
                    RoleDescription = x.Role.Description,
                    RoleId = x.RoleId
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

                if (User == null)
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
                    IsActive = User.IsActive,
                    ProfilePicture = User.ProfilePicture
                };

                BlobHelper BlobHelper = new BlobHelper();
                byte[] PhotoAr = BlobHelper.GetProfilePicture(Result.ResultObject.ProfilePicture);
                Result.ResultObject.ProfilePictureBase64 = Convert.ToBase64String(PhotoAr);
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

        public SingleResultViewModel<bool> SaveUser(UserViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            SettingsViewModel DefaultPassword = _settingsService.GetByModuleKey("User", "DefaultPassword").ResultObject;

            if (DefaultPassword == null)
            {
                Result.Success = false;
                Result.Messages.Add("Adicione a configuração 'DefaultPassword' ao sistema");
                return Result;
            }

            using (KrunkContext _db = new KrunkContext())
            {
                User User = new User()
                {
                    Email = Model.Email,
                    IsActive = Model.IsActive,
                    ReceiveNotification = Model.ReceiveNotification,
                    RoleId = Model.RoleId,
                    UserName = Model.UserName,
                    Password = Encryption.CreateHash(DefaultPassword.Value)
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

        public SingleResultViewModel<bool> UpdateUser(UserViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                User User = _db.User.Where(x => x.Id == Model.Id).FirstOrDefault();

                if (User == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                User.Email = Model.Email;
                User.RoleId = Model.RoleId;
                User.IsActive = Model.IsActive;
                User.ReceiveNotification = Model.ReceiveNotification;

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

        public SingleResultViewModel<bool> DeleteUser(int Id)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                User User = _db.User.Where(x => x.Id == Id).FirstOrDefault();

                if (User == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                try
                {
                    _db.User.Remove(User);
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

        public SingleResultViewModel<bool> UpdateProfilePicture(int Id, UserViewModel Model)
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

                BlobHelper Blob = new BlobHelper();

                // CONVERTION
                string ProfilePictureBase64 = Model.ProfilePictureBase64.Replace("data:image/png;base64,", string.Empty);
                byte[] ProfilePicture = Convert.FromBase64String(ProfilePictureBase64);

                // DELETES OLD FILE (if exists)
                if (!string.IsNullOrEmpty(User.ProfilePicture))
                {
                    Blob.DeleteBlob(User.ProfilePicture);
                }

                // RANDOMNAME
                string FileName = Id + "_" + Guid.NewGuid().ToString();

                // UPLOADS NEW ONE
                Blob.UploadBlob(ProfilePicture, FileName);

                // SAVES THE NAME
                User.ProfilePicture = FileName;

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

        public SingleResultViewModel<string> GetUserProfilePicture(int Id)
        {
            SingleResultViewModel<string> Result = new SingleResultViewModel<string>();

            using (KrunkContext _db = new KrunkContext())
            {
                string FilePath = _db.User
                    .Where(x => x.Id == Id)
                    .Select(x => x.ProfilePicture)
                    .FirstOrDefault();

                BlobHelper Blob = new BlobHelper();
                Result.ResultObject = Convert.ToBase64String(Blob.GetProfilePicture(FilePath));
            }

            return Result;
        }

        public SingleResultViewModel<bool> UpdateUserEmail(ChangeEmailViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            if (!Model.ConfirmEmail.Equals(Model.NewEmail, StringComparison.CurrentCulture))
            {
                Result.Success = false;
                Result.Messages.Add("Emails diferentes!");
                return Result;
            }

            var User = this.GetByPassword(Model.UserName, Model.Password);
            if (!User.Success)
            {
                Result.Success = false;
                Result.Messages.Add("Falha na autenticação");
                return Result;
            }

            using (KrunkContext _db = new KrunkContext())
            {
                User UserDB = _db.User
                    .Where(x => x.UserName.Equals(Model.UserName))
                    .FirstOrDefault();

                UserDB.Email = Model.NewEmail;

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

        public SingleResultViewModel<bool> UpdateUserPassword(ChangePasswordViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            if (!Model.ConfirmPassword.Equals(Model.NewPassword, StringComparison.CurrentCulture))
            {
                Result.Success = false;
                Result.Messages.Add("Senhas diferentes!");
                return Result;
            }

            var User = this.GetByPassword(Model.UserName, Model.Password);
            if (!User.Success)
            {
                Result.Success = false;
                Result.Messages.Add("Falha na autenticação");
                return Result;
            }

            using (KrunkContext _db = new KrunkContext())
            {
                User UserDB = _db.User
                    .Where(x => x.UserName.Equals(Model.UserName))
                    .FirstOrDefault();

                UserDB.Password = Encryption.CreateHash(Model.NewPassword);

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
