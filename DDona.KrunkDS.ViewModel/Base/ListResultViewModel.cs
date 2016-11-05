using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.Base
{
    public class ListResultViewModel<T> : BaseViewModel where T:class
    {
        public ListResultViewModel()
        {
            Success = true;
            Messages = new List<string>();
        }

        public List<T> ResultObjectList { get; set; }
    }
}
