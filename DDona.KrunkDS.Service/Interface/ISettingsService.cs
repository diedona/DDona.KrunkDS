using DDona.KrunkDS.ViewModel.Base;
using DDona.KrunkDS.ViewModel.Base.DataTables;
using DDona.KrunkDS.ViewModel.Settings;

namespace DDona.KrunkDS.Service
{
    public interface ISettingsService
    {
        SingleResultViewModel<bool> DeleteSettings(int Id);
        SingleResultViewModel<SettingsViewModel> GetById(int Id);
        DatatableReturnViewModel<SettingsViewModel> GetSettings(DatatableViewModel Model);
        SingleResultViewModel<bool> SaveSettings(SettingsViewModel Model);
        SingleResultViewModel<bool> UpdateSettings(SettingsViewModel Model);
        SingleResultViewModel<SettingsViewModel> GetByModuleKey(string Module, string Key);
    }
}