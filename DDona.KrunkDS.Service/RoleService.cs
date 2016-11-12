using DDona.KrunkDS.Data;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.Service
{
    public class RoleService : IRoleService
    {
        public ListResultViewModel<RoleViewModel> GetAll()
        {
            ListResultViewModel<RoleViewModel> Result = new ListResultViewModel<RoleViewModel>();

            using (KrunkContext _db = new KrunkContext())
            {
                Result.ResultObjectList = _db.Role
                    .Select(x => new RoleViewModel
                    {
                        Id = x.Id,
                        Description = x.Description
                    }).ToList();
            }

            return Result;
        }
    }
}
