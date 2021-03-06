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

    using System.Linq;

    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.24.0.0")]
    public class KrunkContext : System.Data.Entity.DbContext, IKrunkContext
    {
        public System.Data.Entity.DbSet<Complement> Complement { get; set; } // Complement
        public System.Data.Entity.DbSet<Cup> Cup { get; set; } // Cup
        public System.Data.Entity.DbSet<Person> Person { get; set; } // Person
        public System.Data.Entity.DbSet<Role> Role { get; set; } // Role
        public System.Data.Entity.DbSet<Settings> Settings { get; set; } // Settings
        public System.Data.Entity.DbSet<User> User { get; set; } // User

        static KrunkContext()
        {
            System.Data.Entity.Database.SetInitializer<KrunkContext>(null);
        }

        public KrunkContext()
            : base("Name=KrunkContext")
        {
        }

        public KrunkContext(string connectionString)
            : base(connectionString)
        {
        }

        public KrunkContext(string connectionString, System.Data.Entity.Infrastructure.DbCompiledModel model)
            : base(connectionString, model)
        {
        }

        public KrunkContext(System.Data.Common.DbConnection existingConnection, bool contextOwnsConnection)
            : base(existingConnection, contextOwnsConnection)
        {
        }

        public KrunkContext(System.Data.Common.DbConnection existingConnection, System.Data.Entity.Infrastructure.DbCompiledModel model, bool contextOwnsConnection)
            : base(existingConnection, model, contextOwnsConnection)
        {
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        public bool IsSqlParameterNull(System.Data.SqlClient.SqlParameter param)
        {
            var sqlValue = param.SqlValue;
            var nullableValue = sqlValue as System.Data.SqlTypes.INullable;
            if (nullableValue != null)
                return nullableValue.IsNull;
            return (sqlValue == null || sqlValue == System.DBNull.Value);
        }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new ComplementConfiguration());
            modelBuilder.Configurations.Add(new CupConfiguration());
            modelBuilder.Configurations.Add(new PersonConfiguration());
            modelBuilder.Configurations.Add(new RoleConfiguration());
            modelBuilder.Configurations.Add(new SettingsConfiguration());
            modelBuilder.Configurations.Add(new UserConfiguration());
        }

        public static System.Data.Entity.DbModelBuilder CreateModel(System.Data.Entity.DbModelBuilder modelBuilder, string schema)
        {
            modelBuilder.Configurations.Add(new ComplementConfiguration(schema));
            modelBuilder.Configurations.Add(new CupConfiguration(schema));
            modelBuilder.Configurations.Add(new PersonConfiguration(schema));
            modelBuilder.Configurations.Add(new RoleConfiguration(schema));
            modelBuilder.Configurations.Add(new SettingsConfiguration(schema));
            modelBuilder.Configurations.Add(new UserConfiguration(schema));
            return modelBuilder;
        }
    }
}
// </auto-generated>
