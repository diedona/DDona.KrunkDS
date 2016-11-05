using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ViewModel.Base
{
    public abstract class BaseViewModel
    {
        public bool Success { get; set; }
        public List<string> Messages { get; set; }
    }
}
