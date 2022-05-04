import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
import ".././HR.scss";
import { useHistory } from "react-router-dom";
import { employeeService } from "../../../../Api/services/Employee";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";

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
  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <div className="AddingAndSearching">
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
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
                <td>{item.position.name}</td>
                <td>{item.Status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ExportEmployee