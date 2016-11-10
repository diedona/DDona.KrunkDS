using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.Settings
{
    public class SettingsViewModel
    {
        public int Id { get; set; }
        public string Module { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
