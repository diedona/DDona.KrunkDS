using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.Base.DataTables
{
    public class DatatableViewModel
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public List<DatatableColumnViewModel> columns { get; set; }
        public DatatableOrderViewModel order { get; set; }
        public DatatableColumnSearchViewModel search { get; set; }
    }
}
