using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceManagment.Repository.Migrations
{
    public partial class UpdateSalary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Taxes_Taxes_TaxId",
                table: "Taxes");

            migrationBuilder.DropIndex(
                name: "IX_Taxes_TaxId",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "IncomeTax",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "TaxId",
                table: "Taxes");

            migrationBuilder.RenameColumn(
                name: "SocialTax",
                table: "Taxes",
                newName: "TaxValue");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Taxes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Taxes");

            migrationBuilder.RenameColumn(
                name: "TaxValue",
                table: "Taxes",
                newName: "SocialTax");

            migrationBuilder.AddColumn<decimal>(
                name: "IncomeTax",
                table: "Taxes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "TaxId",
                table: "Taxes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Taxes_TaxId",
                table: "Taxes",
                column: "TaxId");

            migrationBuilder.AddForeignKey(
                name: "FK_Taxes_Taxes_TaxId",
                table: "Taxes",
                column: "TaxId",
                principalTable: "Taxes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
