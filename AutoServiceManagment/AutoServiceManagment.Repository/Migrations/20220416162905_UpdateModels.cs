using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceManagment.Repository.Migrations
{
    public partial class UpdateModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_NonWorkingDetails_NonWorkingDetailId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_NonWorkingDetailId",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "NonWorkingDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_NonWorkingDetails_EmployeeId",
                table: "NonWorkingDetails",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_NonWorkingDetails_Employees_EmployeeId",
                table: "NonWorkingDetails",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NonWorkingDetails_Employees_EmployeeId",
                table: "NonWorkingDetails");

            migrationBuilder.DropIndex(
                name: "IX_NonWorkingDetails_EmployeeId",
                table: "NonWorkingDetails");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "NonWorkingDetails");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_NonWorkingDetailId",
                table: "Employees",
                column: "NonWorkingDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_NonWorkingDetails_NonWorkingDetailId",
                table: "Employees",
                column: "NonWorkingDetailId",
                principalTable: "NonWorkingDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
