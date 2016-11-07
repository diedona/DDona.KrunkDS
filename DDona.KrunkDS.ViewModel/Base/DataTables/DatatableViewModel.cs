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
        public string value { get; set; }
        public List<DatatableColumnViewModel> columns { get; set; }
        public List<DatatableOrderViewModel> order { get; set; }
        public DatatableColumnSearchViewModel search { get; set; }

        public string OrderColumn
        {
            get
            {
                var column = columns[order.FirstOrDefault().column];
                string orderStr = string.IsNullOrEmpty(column.name) ? column.data : column.name;
                return orderStr + " " + order.FirstOrDefault().dir;
            }
        }
    }
}
