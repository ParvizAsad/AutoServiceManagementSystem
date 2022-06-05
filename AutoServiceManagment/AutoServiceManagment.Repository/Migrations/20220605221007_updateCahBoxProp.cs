using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceManagment.Repository.Migrations
{
    public partial class updateCahBoxProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "CashBoxes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "CashBoxes");
        }
    }
}
