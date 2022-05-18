import React from 'react'
import {
Table,
Button
} from "reactstrap";
import Service from '../Service/Service';
// import "./Customer.scss";
import { useHistory } from "react-router-dom";
import { customerService } from '../../../Api/services/Customers';
import Swal from "sweetalert2";
import { useState } from "react";


function Customer(props) {

  const [customer, setCustomer] = React.useState([]);
  const [searchCustomer, setSearchCustomer]=useState(" ");

  const history = useHistory();

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomer(data);
    });
  }, []);

  function EditCustomer(id){
    console.log(id)
   props.history.push("/EditCustomer/"+id)
  } 

  function CustomerDetail(id){
   props.history.push("/CustomerDetail/"+id)
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
          {customerService.deleteCustomer(id) &&
          history.push("/customer")};
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
       customerService.getAllCustomers().then(({ data }) => {
        setCustomer(data);
       })
      }, 500);
 
     });
  }

  return (
    <>
<div className ='ForHeading'>
    <h1>Customers</h1>
</div>
<div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createcustomer")} >Create Customer</Button>
        </div>
        <Button onClick={() => history.push("/ExportCustomer")} >Export</Button>
        <input type="text" placeholder="Search.." />
      </div>
<div>
    <Table className='TableForItems'>
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>
          Customer Name
        </th>
        <th>
          Service 
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {customer?.filter((val)=>{
                  if(searchCustomer==" "){
                    return val
                  } else if (val.fullName.toLowerCase().includes(searchCustomer.toLowerCase()))
                  {
                    return val
                  }
                }).map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.id}</td>
                <td className="Actions">
                  <Button onClick={()=>EditCustomer(item.id)} className="Edit">Edit</Button>
                  <Button onClick={()=>deleteButton(item.id) } className="Delete">Delete</Button>
                  <Button onClick={()=>CustomerDetail(item.id)} className="Detail">Detail</Button>
                </td>
              </tr>
            ))}
    </tbody>
    </Table>
</div>
</>

  )
}

export default Customer