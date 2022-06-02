using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceManagment.Repository.Migrations
{
    public partial class AddCustomerService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProduct_Customers_CustomerID",
                table: "CustomerProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProduct_Products_ProductID",
                table: "CustomerProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerServices_Customers_CustomerID",
                table: "CustomerServices");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerServices_Services_ServiceID",
                table: "CustomerServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerServices",
                table: "CustomerServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerProduct",
                table: "CustomerProduct");

            migrationBuilder.RenameTable(
                name: "CustomerServices",
                newName: "CustomerServicess");

            migrationBuilder.RenameTable(
                name: "CustomerProduct",
                newName: "CustomerProducts");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerServices_ServiceID",
                table: "CustomerServicess",
                newName: "IX_CustomerServicess_ServiceID");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerServices_CustomerID",
                table: "CustomerServicess",
                newName: "IX_CustomerServicess_CustomerID");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerProduct_ProductID",
                table: "CustomerProducts",
                newName: "IX_CustomerProducts_ProductID");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerProduct_CustomerID",
                table: "CustomerProducts",
                newName: "IX_CustomerProducts_CustomerID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerServicess",
                table: "CustomerServicess",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerProducts",
                table: "CustomerProducts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProducts_Customers_CustomerID",
                table: "CustomerProducts",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProducts_Products_ProductID",
                table: "CustomerProducts",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerServicess_Customers_CustomerID",
                table: "CustomerServicess",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerServicess_Services_ServiceID",
                table: "CustomerServicess",
                column: "ServiceID",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProducts_Customers_CustomerID",
                table: "CustomerProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProducts_Products_ProductID",
                table: "CustomerProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerServicess_Customers_CustomerID",
                table: "CustomerServicess");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerServicess_Services_ServiceID",
                table: "CustomerServicess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerServicess",
                table: "CustomerServicess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerProducts",
                table: "CustomerProducts");

            migrationBuilder.RenameTable(
                name: "CustomerServicess",
                newName: "CustomerServices");

            migrationBuilder.RenameTable(
                name: "CustomerProducts",
                newName: "CustomerProduct");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerServicess_ServiceID",
                table: "CustomerServices",
                newName: "IX_CustomerServices_ServiceID");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerServicess_CustomerID",
                table: "CustomerServices",
                newName: "IX_CustomerServices_CustomerID");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerProducts_ProductID",
                table: "CustomerProduct",
                newName: "IX_CustomerProduct_ProductID");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerProducts_CustomerID",
                table: "CustomerProduct",
                newName: "IX_CustomerProduct_CustomerID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerServices",
                table: "CustomerServices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerProduct",
                table: "CustomerProduct",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProduct_Customers_CustomerID",
                table: "CustomerProduct",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProduct_Products_ProductID",
                table: "CustomerProduct",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerServices_Customers_CustomerID",
                table: "CustomerServices",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerServices_Services_ServiceID",
                table: "CustomerServices",
                column: "ServiceID",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
