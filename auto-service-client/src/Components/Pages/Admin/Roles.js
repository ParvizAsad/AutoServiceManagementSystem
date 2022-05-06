import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
// import "./Role.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { roleService } from "../../../Api/services/Roles";

function Role(props) {

  const [Role, setRole] = React.useState([]);
  const [RoleData, setRoleData] = useState();
  const history = useHistory();

  const getAllRole = useCallback(() => {
    roleService.getAllRoles().then(({ data }) => {
      setRoleData(data);
    });
  }, [setRoleData]);


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
        {roleService.deleteRole(id) &&
        // history.push("/Role") 
        <Link to="/Role"></Link>
      
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
//  fetch(`https://localhost:44330/api/Roles/${id}`, {
//    method:'DELETE'
//  }).then((result)=>{
// result.json().then((resp)=>{
//   console.warn(resp)
//   getAllRole();
//   history.push("/Role");
// })})}

// function getPosition(id){
//   fetch(`https://localhost:44330/api/Position/${id}`, {
//     method:'GET'
//   }).then((result)=>{
//  result.json().then((resp)=>{
//    console.warn(resp)
//    getAllRole();
//  })})}

function EditRole(id){
  console.log(id)
 props.history.push("/EditRole/"+id)
} 

function RoleDetail(id){
  console.log(id)
 props.history.push("/RoleDetail/"+id)
} 

  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createrole")} >Create Role</Button>
        </div>
        <Button onClick={() => history.push("/ExportRole")} >Export</Button>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Role?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td className="Actions">
                  <Button onClick={()=>EditRole(item.id)} className="Edit">Edit</Button>
                  <Button onClick={()=>deleteButton(item.id) } className="Delete">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Role;
