import React from "react";
import { Table } from "reactstrap";
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
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { customerService } from "../../../Api/services/Customers";

function ExportCustomer() {
  const [Customer, setCustomer] = React.useState([]);

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomer(data);
    });
  }, []);

  $(document).ready(function () {
    setTimeout(function () {
      $("#CustomerData").DataTable({
        pagingType: "full_numbers",
        pageLength: 5,
        processing: true,
        dom: "Bfrtip",
        buttons: ["copy", "excel", "csv", "pdf", "print"],
      });
    }, 1000);
  });

  //   $(document).ready(function() {
  //     var table = $('#CustomerData').DataTable( {
  //         buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print', 'colvis' ],
  //     } );

  //     table.buttons().container()
  //         .appendTo( '#example_wrapper .col-md-6:eq(0)' );
  // } );

  return (
    <>
      <div className="ForHeading">
        <h1>Customers</h1>
      </div>
      <div>
        <Table className="TableForItems" id="CustomerData">
          <thead>
            <tr>
              <th>#</th>
              <th>FullName</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            {Customer?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.Serice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExportCustomer;
