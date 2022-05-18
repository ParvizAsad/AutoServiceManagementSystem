import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
// import "./Employee.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState,useCallback,useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { employeeService } from "../../../../Api/services/Employee";


function Employee(props) {
  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [searchEmployee, setSearchEmployee]=useState(" ");
  const history = useHistory();

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, [setEmployee]);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      console.log(data);
      setEmployee(data);
    });
  }, []);

  const deleteButton = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          employeeService.deleteEmployee(id) && getAllEmployee()
          // employeeService.getAllEmployee().then(({ data }) => {
          //     setEmployee(data);
          //   });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      }).finally(() => {
        setTimeout(() => {
         employeeService.getAllEmployee().then(({ data }) => {
           setEmployee(data);
         })
        }, 500);
   
       });
  };


  function EditEmployee(id) {
    console.log(id);
    props.history.push("/EditEmployee/" + id);
  }

  function EmployeeDetail(id) {
    console.log(id);
    props.history.push("/EmployeeDetail/" + id);
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="ForHeading">
        <h1>Employees</h1>
      </div>
      <div className="AddingAndSearching">
       <button onClick={handlePrint} className="print__button">  Print </button> 
        <div className="Adding">
          <Button onClick={() => history.push("/createemployee")}>
            Create Employee
          </Button>
        </div>
        <input type="text" placeholder="Search.." onChange={event=>{setSearchEmployee(event.target.value)}}/>
        <Button onClick={() => history.push("/ExportEmployee")}>Export</Button>
      </div>
      <div ref={componentRef}>
        <Table  className="TableForItems" id="example">
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
            {employee?.filter((val)=>{
              if(searchEmployee==" "){
                return val
              } else if (val.name.toLowerCase().includes(searchEmployee.toLowerCase()))
              {
                return val
              }
            }).map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{item.id}</th>
                <td>{item.fullName}</td>
                <td>{item.positionId}</td>
                <td>{item.status}</td>
                <td className="Actions">
                  <Button
                    onClick={() => EditEmployee(item.id)}
                    className="Edit"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteButton(item.id)}
                    className="Delete"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => EmployeeDetail(item.id)}
                    className="Detail"
                  >
                    Detail
                  </Button>
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
