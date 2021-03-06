// <auto-generated>
// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.51
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning

namespace DDona.KrunkDS.Data
{

    public interface IKrunkContext : System.IDisposable
    {
        System.Data.Entity.DbSet<Complement> Complement { get; set; } // Complement
        System.Data.Entity.DbSet<Cup> Cup { get; set; } // Cup
        System.Data.Entity.DbSet<Person> Person { get; set; } // Person
        System.Data.Entity.DbSet<Role> Role { get; set; } // Role
        System.Data.Entity.DbSet<Settings> Settings { get; set; } // Settings
        System.Data.Entity.DbSet<User> User { get; set; } // User

        int SaveChanges();
        System.Threading.Tasks.Task<int> SaveChangesAsync();
        System.Threading.Tasks.Task<int> SaveChangesAsync(System.Threading.CancellationToken cancellationToken);
    }

}
// </auto-generated>
