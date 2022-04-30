import React from 'react'
import {
  Table,
  Button
  } from "reactstrap";
import { useHistory } from "react-router-dom";
import { taxService } from '../../../../Api/services/Taxes';
import Swal from "sweetalert2";

function Tax() {

  const [taxes, setTaxes] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    taxService.getAllTaxes().then(({ data }) => {
      setTaxes(data);
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
          {taxService.deleteTax(id) &&
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
    <h1>Tax</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
      <Button onClick={() => history.push("/createTax")} >Create a new Tax</Button>
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
              Name
            </th>
            <th>
            TaxValue
            </th>
            <th>
            SocialTax
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {taxes?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>{item.TaxValue}</td>
                <td>{item.SocialTax}</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
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

export default Tax