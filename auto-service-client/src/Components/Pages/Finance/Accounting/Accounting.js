import React from 'react'
import {
  Table,
  Button
  } from "reactstrap";
import { financeService } from '../../../../Api/services/Finances';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function Accounting() {

  const [finance, setFinance] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    financeService.getAllFinances().then(({ data }) => {
      setFinance(data);
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
          {financeService.deleteFinance(id) &&
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
    <h1>Accounting</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
      <Button onClick={() => history.push("/createaccounting")} >Create a new Financial Line</Button>
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
              Communal Cost
            </th>
            <th>
              Additional Cost
            </th>
            <th>
              Date
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {finance?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.CommunalCost}</td>
                <td>{item.AdditionalCost}</td>
                <td>{item.Date}</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
                  <Button className="Delete">Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
        </Table>
    </div>
</>
  )
}

export default Accounting