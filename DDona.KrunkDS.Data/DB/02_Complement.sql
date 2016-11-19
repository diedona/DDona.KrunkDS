SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.Complement
	(
	Id int NOT NULL IDENTITY (1, 1),
	Description varchar(50) NOT NULL,
	Price decimal(5, 2) NOT NULL,
	IsActive bit NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Complement ADD CONSTRAINT
	PK_Complement PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Complement SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Complement', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Complement', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Complement', 'Object', 'CONTROL') as Contr_Per 