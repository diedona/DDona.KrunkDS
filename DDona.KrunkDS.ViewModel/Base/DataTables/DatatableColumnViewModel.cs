using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.Base.DataTables
{
    public class DatatableColumnViewModel
    {
        public string data { get; set; }
        public string name { get; set; }
        public bool searchable { get; set; }
        public bool orderable { get; set; }
        public DatatableColumnSearchViewModel search { get; set; }
    }
}
