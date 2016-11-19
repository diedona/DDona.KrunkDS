using DDona.KrunkDS.Data;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Complement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.Service
{
    public class ComplementService : IComplementService
    {
        public DatatableReturnViewModel<ComplementViewModel> GetCups(DatatableViewModel Model)
        {
            DatatableReturnViewModel<ComplementViewModel> Result = new DatatableReturnViewModel<ComplementViewModel>();

            int recordsFiltered = 0;
            int recordsTotal = 0;

            using (KrunkContext _db = new KrunkContext())
            {
                IQueryable<Complement> Complements = _db.Complement.AsQueryable();

                recordsTotal = Complements.Count();

                if (Model.valueDecimal.HasValue)
                {
                    Complements = Complements.Where(x => x.Price == Model.valueDecimal.Value);
                }

                if(!string.IsNullOrEmpty(Model.value))
                {
                    Complements = Complements.Where(x => x.Description.Contains(Model.value));
                }

                recordsFiltered = Complements.Count();

                // DYNAMIC ORDER BY
                Complements = Complements.OrderBy(Model.OrderColumn);

                // SKIP / TAKE
                Complements = Complements.Skip(Model.start).Take(Model.length);

                // SELECT DATA
                Result.data = Complements.Select(x => new ComplementViewModel
                {
                    Description = x.Description,
                    Id = x.Id,
                    IsActive = x.IsActive,
                    Price = x.Price
                }).ToArray();

            }

            return Result;
        }

        public SingleResultViewModel<bool> SaveCup(ComplementViewModel Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Complement Complement = new Complement()
                {
                    Description = Model.Description,
                    IsActive = Model.IsActive,
                    Price = Model.Price
                };

                try
                {
                    _db.Complement.Add(Complement);
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

        public SingleResultViewModel<bool> UpdateCup(Complement Model)
        {
            SingleResultViewModel<bool> Result = new SingleResultViewModel<bool>();

            using (KrunkContext _db = new KrunkContext())
            {
                Complement Complement = _db.Complement
                    .Where(x => x.Id == Model.Id)
                    .FirstOrDefault();

                if (Complement == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                Complement.Description = Model.Description;
                Complement.IsActive = Model.IsActive;
                Complement.Price = Model.Price;

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
                Complement Complement = _db.Complement
                    .Where(x => x.Id == Id)
                    .FirstOrDefault();

                if (Complement == null)
                {
                    Result.Success = false;
                    Result.Messages.Add("Recurso não encontrado");
                    return Result;
                }

                try
                {
                    _db.Complement.Remove(Complement);
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
