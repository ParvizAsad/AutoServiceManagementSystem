import {
  Table,
  Button
  } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useCallback, useState } from "react";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
import moment from "moment";


function Salary() {

  const [Salaries, setSalaries] = React.useState([]);
  const [SalaryData, setSalaryData] = useState();

  const history = useHistory();
  const getAllSalary = useCallback(() => {
    salaryService.getAllSalaries().then(({ data }) => {
      setSalaryData(data);
    });
  }, [setSalaryData]);

  React.useEffect(() => {
    salaryService.getAllSalaries().then(({ data }) => {
      setSalaries(data);
    });
  }, []);

  function editSalary(id){
   history.push("/EditSalary/"+id)
  } 

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
          salaryService.deleteSalary(id);
          getAllSalary();
          history.push("/Salary");
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
    }).finally(() => {
      setTimeout(() => {
      salaryService.getAllSalaries().then(({ data }) => {
        setSalaries(data);
       })
      }, 500);
 
     });
  }
  
  return (
    <>
    <div className ='ForHeading'>
    <h1>Salaries</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
      <Button onClick={() => history.push("/createSalary")} >Create a new Salary</Button>
      </div>
      <input type="text" placeholder="Search.."/>
    </div>
    <div>
        <Table className='TableForItems'>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Employee
            </th>
            <th>
            Date
            </th>
            <th>
            Bonus
            </th>
            <th>
            NetSalary
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {Salaries?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                {/* <th>{(employeeService.getEmployeeByID(6)).fullName}             
                </th> */}
                <th>{moment(item.date).format("MM-DD-yyyy")}</th>
                <th>{item.bonus}</th>
                <th>{item.netSalary}</th>
                <td>{item.salaryValue}</td>
                <td className="Actions">
                  <Button onClick={()=>editSalary(item.id)} className="Edit">Edit</Button>
                  <Button onClick={()=>deleteButton(item.id) } className="Delete">Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
        </Table>
    </div>
</>
  )
}

export default Salary