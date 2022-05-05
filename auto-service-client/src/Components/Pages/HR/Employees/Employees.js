import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
// import "./Employee.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { employeeService } from "../../../../Api/services/Employee";

function Employee(props) {

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

const deleteButton = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
        {employeeService.deleteEmployee(id) &&
        // history.push("/Employee") 
        <Link to="/Employee"></Link>
      
      };
    } 
    else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}

// function deleteEmplyee(id){
//  fetch(`https://localhost:44330/api/Employees/${id}`, {
//    method:'DELETE'
//  }).then((result)=>{
// result.json().then((resp)=>{
//   console.warn(resp)
//   getAllEmployee();
//   history.push("/Employee");
// })})}

// function getPosition(id){
//   fetch(`https://localhost:44330/api/Position/${id}`, {
//     method:'GET'
//   }).then((result)=>{
//  result.json().then((resp)=>{
//    console.warn(resp)
//    getAllEmployee();
//  })})}

function EditEmployee(id){
  console.log(id)
 props.history.push("/EditEmployee/"+id)
} 

function EmployeeDetail(id){
  console.log(id)
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
                  <Button onClick={()=>EditEmployee(item.id)} className="Edit">Edit</Button>
                  <Button onClick={()=>deleteButton(item.id) } className="Delete">Delete</Button>
                  <Button onClick={()=>EmployeeDetail(item.id)} className="Detail">Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Employee;
