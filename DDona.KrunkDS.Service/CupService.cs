using DDona.KrunkDS.Data;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Cup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.Service
{
    public class CupService : ICupService
    {
        public SingleResultViewModel<CupViewModel> GetById(int Id)
        {
            SingleResultViewModel<CupViewModel> Result = new SingleResultViewModel<CupViewModel>();

            using (KrunkContext _db = new KrunkContext())
            {
                Cup Cup = _db.Cup
                    .Where(x => x.Id == Id)
                    .FirstOrDefault();

                if (Cup == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Resource not found");
                    return Result;
                }

                Result.ResultObject = new CupViewModel
                {
                    Description = Cup.Description,
                    Id = Cup.Id,
                    IsActive = Cup.IsActive,
                    Price = Cup.Price
                };
            }

            return Result;
        }

        public DatatableReturnViewModel<CupViewModel> GetCups(DatatableViewModel Model)
        {
            DatatableReturnViewModel<CupViewModel> Result = new DatatableReturnViewModel<CupViewModel>();

            int recordsFiltered = 0;
            int recordsTotal = 0;

            using (KrunkContext _db = new KrunkContext())
            {
                IQueryable<Cup> Cup = _db.Cup.AsQueryable();

                recordsTotal = Cup.Count();

                if ((!string.IsNullOrEmpty(Model.value)))
                {
                    Cup = Cup.Where(x => x.Description.Contains(Model.value));
                }

                if (Model.valueDecimal.HasValue)
                {
                    Cup = Cup.Where(x => x.Price == Model.valueDecimal.Value);
                }

                recordsFiltered = Cup.Count();

                // DYNAMIC ORDER BY
                Cup = Cup.OrderBy(Model.OrderColumn);

                // SKIP / TAKE
                Cup = Cup.Skip(Model.start).Take(Model.length);

                // SELECT DATA
                Result.data = Cup.Select(x => new CupViewModel
                {
                    Description = x.Description,
                    Id = x.Id,
                    IsActive = x.IsActive,
                    Price = x.Price
                }).ToArray();
            }

            Result.draw = Model.draw;
            Result.recordsFiltered = recordsFiltered;
            Result.recordsTotal = recordsTotal;

            return Result;
        }

        public SingleResultViewModel<bool> SaveCup(CupViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Cup Cup = new Cup()
                {
                    Description = Model.Description,
                    IsActive = Model.IsActive,
                    Price = Model.Price
                };

                try
                {
                    _db.Cup.Add(Cup);
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

        public SingleResultViewModel<bool> UpdateCup(CupViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Cup Cup = _db.Cup
                    .Where(x => x.Id == Model.Id)
                    .FirstOrDefault();

                if (Cup == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                Cup.Description = Model.Description;
                Cup.IsActive = Model.IsActive;
                Cup.Price = Model.Price;

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

        public SingleResultViewModel<bool> DeleteCup(int Id)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Cup Cup = _db.Cup
                    .Where(x => x.Id == Id)
                    .FirstOrDefault();

                if (Cup == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                try
                {
                    _db.Cup.Remove(Cup);
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
