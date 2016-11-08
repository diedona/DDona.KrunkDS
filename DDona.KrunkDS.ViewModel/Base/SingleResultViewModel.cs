using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.Base
{
    public class SingleResultViewModel<T> : BaseViewModel
    {
        public SingleResultViewModel()
        {
            Success = true;
            Messages = new List<string>();
        }

        public T ResultObject { get; set; }
    }
}
