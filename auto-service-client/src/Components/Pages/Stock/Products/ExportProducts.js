import React from "react";
import { Table } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
// import "datatables.net-buttons/js/buttons.excel.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { productService } from "../../../../Api/services/Products";

function ExportProduct() {
  const [Product, setProduct] = React.useState([]);
  const [ProductData, setProductData] = useState();

  const getAllProduct = useCallback(() => {
    productService.getAllProducts().then(({ data }) => {
      setProductData(data);
    });
  }, [setProductData]);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProduct(data);
    });
  }, []);

  $(document).ready(function () {
    setTimeout(function () {
      $("#ProductData").DataTable({
        pagingType: "full_numbers",
        pageLength: 5,
        processing: true,
        dom: "Bfrtip",
        buttons: ["copy", "excel", "csv", "pdf", "print"],
      });
    }, 1000);
  });

  //   $(document).ready(function() {
  //     var table = $('#ProductData').DataTable( {
  //         buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print', 'colvis' ],
  //     } );

  //     table.buttons().container()
  //         .appendTo( '#example_wrapper .col-md-6:eq(0)' );
  // } );

  return (
    <>
      <div className="ForHeading">
        <h1>Products</h1>
      </div>
      <div>
        <Table className="TableForItems" id="ProductData">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Product?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>{item.Amount}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExportProduct;
