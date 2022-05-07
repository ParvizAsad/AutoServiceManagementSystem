import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
import ".././HR.scss";
import { useHistory } from "react-router-dom";
import { employeeService } from "../../../../Api/services/Employee";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
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

function ExportEmployee() {
  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();
  const history = useHistory();

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployeeData(data);
    });
  }, [setEmployeeData]);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      console.log(data);
      setEmployee(data);
    });
  }, []);

  $(document).ready(function () {
    setTimeout(function () {
      $("#employeeData").DataTable({
        pagingType: "full_numbers",
        pageLength: 5,
        processing: true,
        dom: "Bfrtip",
        buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print' ],
      });
    }, 1000);
  });

//   $(document).ready(function() {
//     var table = $('#employeeData').DataTable( {
//         buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print', 'colvis' ],
//     } );
 
//     table.buttons().container()
//         .appendTo( '#example_wrapper .col-md-6:eq(0)' );
// } );

  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <div>
        <Table className="TableForItems" id="employeeData">
          <thead>
            <tr>
              <th>#</th>
              <th>FullName</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.Position}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ExportEmployee;
