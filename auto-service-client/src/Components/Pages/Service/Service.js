import React from 'react'
import {
Table,
Button
} from "reactstrap";
import { serviceService } from '../../../Api/services/Services';
import "./Service.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import EditService from './EditService';


function Service() {

  const [service, setService] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setService(data);
      
    });
  }, []);

  function editService(id){
    history.push("/EditService/"+id)
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
          {serviceService.deleteService(id) &&
          history.push("/")};
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

  return (
    <>
    <div className ='ForHeading'>
    <h1>Services</h1>
    </div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button onClick={() => history.push("/createservice")}>Add Service</Button>
  </div>
  <Button onClick={() => history.push("/ExportService")} >Export</Button>
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
          Name
        </th>
        <th>
          Detail
        </th>
        <th>
          Price
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {service?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.detail}</td>
                <td className="Actions">
                  <Button onClick={()=>editService(item.id)} className="Edit">Edit</Button>
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

export default Service