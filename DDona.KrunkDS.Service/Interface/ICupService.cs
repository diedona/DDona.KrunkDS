using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Cup;

namespace DDona.KrunkDS.Service
{
    public interface ICupService
    {
        SingleResultViewModel<CupViewModel> GetById(int Id);
        DatatableReturnViewModel<CupViewModel> GetCups(DatatableViewModel Model);
        SingleResultViewModel<bool> SaveCup(CupViewModel Model);
        SingleResultViewModel<bool> UpdateCup(CupViewModel Model);
        SingleResultViewModel<bool> DeleteCup(int Id);
    }
}