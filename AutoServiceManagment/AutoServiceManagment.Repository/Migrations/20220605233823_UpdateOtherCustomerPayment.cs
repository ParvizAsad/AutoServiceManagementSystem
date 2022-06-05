using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceManagment.Repository.Migrations
{
    public partial class UpdateOtherCustomerPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OtherCustomerPayments_Services_ServiceID",
                table: "OtherCustomerPayments");

            migrationBuilder.DropIndex(
                name: "IX_OtherCustomerPayments_ServiceID",
                table: "OtherCustomerPayments");

            migrationBuilder.DropColumn(
                name: "ServiceID",
                table: "OtherCustomerPayments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceID",
                table: "OtherCustomerPayments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OtherCustomerPayments_ServiceID",
                table: "OtherCustomerPayments",
                column: "ServiceID");

            migrationBuilder.AddForeignKey(
                name: "FK_OtherCustomerPayments_Services_ServiceID",
                table: "OtherCustomerPayments",
                column: "ServiceID",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
