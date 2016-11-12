using DDona.KrunkDS.Data;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.Service
{
    public class SettingsService : ISettingsService
    {
        public DatatableReturnViewModel<SettingsViewModel> GetSettings(DatatableViewModel Model)
        {
            DatatableReturnViewModel<SettingsViewModel> Result = new DatatableReturnViewModel<SettingsViewModel>();

            int recordsFiltered = 0;
            int recordsTotal = 0;

            using (KrunkContext _db = new KrunkContext())
            {
                IQueryable<Settings> Settings = _db.Settings.AsQueryable();

                recordsTotal = Settings.Count();

                if ((!string.IsNullOrEmpty(Model.value)))
                {
                    Settings = Settings.Where(x =>
                        x.Key.Contains(Model.value) || x.Module.Contains(Model.value) || x.Value.Contains(Model.value)
                    );
                }

                recordsFiltered = Settings.Count();

                // DYNAMIC ORDER BY
                Settings = Settings.OrderBy(Model.OrderColumn);

                // SKIP / TAKE
                Settings = Settings.Skip(Model.start).Take(Model.length);

                // SELECT DATA
                Result.data = Settings.Select(x => new SettingsViewModel
                {
                    Id = x.Id,
                    CreateDate = x.CreateDate,
                    Key = x.Key,
                    Value = x.Value,
                    Module = x.Module,
                }).ToArray();
            }

            Result.draw = Model.draw;
            Result.recordsFiltered = recordsFiltered;
            Result.recordsTotal = recordsTotal;

            return Result;
        }

        public SingleResultViewModel<bool> SaveSettings(SettingsViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Settings Settings = new Settings()
                {
                    CreateDate = DateTime.Now,
                    Key = Model.Key,
                    Module = Model.Module,
                    Value = Model.Value
                };

                try
                {
                    _db.Settings.Add(Settings);
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

        public SingleResultViewModel<bool> UpdateSettings(SettingsViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Settings Settings = _db.Settings
                    .Where(x => x.Id == Model.Id)
                    .FirstOrDefault();

                if (Settings == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                Settings.Value = Model.Value;

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

        public SingleResultViewModel<bool> DeleteSettings(int Id)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Settings Settings = _db.Settings
                    .Where(x => x.Id == Id)
                    .FirstOrDefault();

                if (Settings == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                try
                {
                    _db.Settings.Remove(Settings);
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

        public SingleResultViewModel<SettingsViewModel> GetById(int Id)
        {
            SingleResultViewModel<SettingsViewModel> Result = new SingleResultViewModel<SettingsViewModel>();

            using (KrunkContext _db = new KrunkContext())
            {
                Result.ResultObject = _db.Settings
                    .Where(x => x.Id == Id)
                    .Select(x => new SettingsViewModel
                    {
                        Id = x.Id,
                        CreateDate = x.CreateDate,
                        Key = x.Key,
                        Value = x.Value,
                        Module = x.Module,
                    }).FirstOrDefault();
            }

            return Result;
        }

        public SingleResultViewModel<SettingsViewModel> GetByModuleKey(string Module, string Key)
        {
            SingleResultViewModel<SettingsViewModel> Result = new SingleResultViewModel<SettingsViewModel>();

            using (KrunkContext _db = new KrunkContext())
            {
                Result.ResultObject = _db.Settings
                    .Where(x => x.Module.Equals(Module) && x.Key.Equals(Key))
                    .Select(x => new SettingsViewModel
                    {
                        Id = x.Id,
                        Key = x.Key,
                        Module = x.Module,
                        Value = x.Value
                    }).FirstOrDefault();
            }

            return Result;
        }
    }
}
