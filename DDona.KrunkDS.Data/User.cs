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

    // User
    [System.CodeDom.Compiler.GeneratedCode("EF.Reverse.POCO.Generator", "2.24.0.0")]
    public class User
    {
        public int Id { get; set; } // Id (Primary key)
        public string UserName { get; set; } // UserName (length: 20)
        public string Password { get; set; } // Password (length: 120)
        public string Email { get; set; } // Email (length: 150)
        public bool ReceiveNotification { get; set; } // ReceiveNotification
        public bool IsActive { get; set; } // IsActive
        public int RoleId { get; set; } // RoleId
        public string ProfilePicture { get; set; } // ProfilePicture (length: 80)

        // Foreign keys
        public virtual Role Role { get; set; } // FK_User_Role
    }

}
// </auto-generated>
