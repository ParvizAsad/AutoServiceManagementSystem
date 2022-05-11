import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
// import "./Employee.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { employeeService } from "../../../Api/services/Employee";

function CreateUser(props) {

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


function MakeUser(id){
 props.history.push("/EmployeeDetail/"+id)
} 

  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createemployee")} >Create Employee</Button>
        </div>
        <Button onClick={() => history.push("/ExportEmployee")} >Export</Button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.Position}</td>
                <td>{item.Status}</td>
                <td className="Actions">
                  <Button onClick={()=>MakeUser(item.id)} className="MakeUser">Make User</Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CreateUser;
