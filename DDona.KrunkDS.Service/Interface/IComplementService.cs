using DDona.KrunkDS.Data;
using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Complement;

namespace DDona.KrunkDS.Service
{
    public interface IComplementService
    {
        SingleResultViewModel<bool> DeleteComplement(int Id);
        DatatableReturnViewModel<ComplementViewModel> GetComplements(DatatableViewModel Model);
        SingleResultViewModel<bool> SaveComplement(ComplementViewModel Model);
        SingleResultViewModel<bool> UpdateComplement(ComplementViewModel Model);
    }
}