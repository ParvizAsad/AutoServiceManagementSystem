using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceManagment.Repository.Migrations
{
    public partial class UpdateFinancial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "Finances",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Detail",
                table: "Finances");
        }
    }
}
