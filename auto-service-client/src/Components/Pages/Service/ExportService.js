import React from "react";
import { Table } from "reactstrap";
import { useState } from "react";
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
import { serviceService } from "../../../Api/services/Services";

function ExportService() {
  const [Service, setService] = React.useState([]);
  const [ServiceData, setServiceData] = useState();


  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setService(data);
    });
  }, []);

  $(document).ready(function () {
    setTimeout(function () {
      $("#ServiceData").DataTable({
        pagingType: "full_numbers",
        pageLength: 5,
        processing: true,
        dom: "Bfrtip",
        buttons: ["copy", "excel", "csv", "pdf", "print"],
      });
    }, 1000);
  });

  //   $(document).ready(function() {
  //     var table = $('#ServiceData').DataTable( {
  //         buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print', 'colvis' ],
  //     } );

  //     table.buttons().container()
  //         .appendTo( '#example_wrapper .col-md-6:eq(0)' );
  // } );

  return (
    <>
      <div className="ForHeading">
        <h1>Services</h1>
      </div>
      <div>
        <Table className="TableForItems" id="ServiceData">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Detail</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Service?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>{item.Detail}</td>
                <td>{item.Price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExportService;
