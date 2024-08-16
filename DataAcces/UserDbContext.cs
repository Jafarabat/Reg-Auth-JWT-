using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql;

public class UserDbContext(IConfiguration configuration) : IdentityDbContext<User, IdentityRole<long>, long>
{
    private readonly IConfiguration _configuration = configuration;

    public static string GetConnectionString()
    {
        return new NpgsqlConnectionStringBuilder()
        {
            Host = "localhost",
            Port = 5433,
            Database = "my_database",
            Username = "postgres",
            Password = "1"
        }.ConnectionString;
    }

    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(GetConnectionString());
    }
}