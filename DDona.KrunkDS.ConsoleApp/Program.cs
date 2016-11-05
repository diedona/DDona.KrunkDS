using DDona.KrunkDS.Util.Encryption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DDona.KrunkDS.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("What is the password?");
            string Pw = Console.ReadLine();
            string PwHashed = Encryption.CreateHash(Pw);
            Console.WriteLine("This is the hashed: " + PwHashed);
            Console.ReadKey();
        }
    }
}
