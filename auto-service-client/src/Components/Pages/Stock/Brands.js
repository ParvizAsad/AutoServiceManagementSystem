import React from "react";
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { brandService } from "../../../Api/services/Brands";

function Brand() {

  const [brands, setBrands] = useState([]);
  const history = useHistory();

  React.useEffect(() => {
    brandService.getAllBrands().then(({ data }) => {
      setBrands(data);
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
          {brandService.deleteBrand(id) &&
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
      <div className="ForHeading">
        <h1>Brands</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createbrand")} >Create brand</Button>
        </div>
        <Button>Export</Button>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>xx</td>
                <td>xx</td>
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
  );
}

export default Brand;
