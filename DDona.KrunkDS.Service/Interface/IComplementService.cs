using DDona.KrunkDS.Data;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Complement;

namespace DDona.KrunkDS.Service
{
    public interface IComplementService
    {
        SingleResultViewModel<bool> DeleteCup(int Id);
        DatatableReturnViewModel<ComplementViewModel> GetCups(DatatableViewModel Model);
        SingleResultViewModel<bool> SaveCup(ComplementViewModel Model);
        SingleResultViewModel<bool> UpdateCup(Complement Model);
    }
}