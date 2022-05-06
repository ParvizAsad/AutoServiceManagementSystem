import React from "react";
import { Table, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { positionService } from "../../../../Api/services/Positions";
import Swal from "sweetalert2";
import { INITIAL_ASYNC_VALUES } from "../../../../Consts/const";

function Position() {

  const [positions, setPositions] = useState(INITIAL_ASYNC_VALUES);
  const history = useHistory();

  React.useEffect(() => {
    setPositions(oldvalues=>({...oldvalues, loading:true}))
    positionService.getAllPositions().then(({ data }) => {
      setPositions(oldvalues=>({...oldvalues, loading:false, data}))
    }).catch((error)=>{
      setPositions({data:undefined, loading:false, error})
    });
  }, []);




  function editPosition(id){
    history.push("/EditPosition/"+id)
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
          {positionService.deletePosition(id) &&
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
        <h1>Positions</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createposition")} >Create position</Button>
        </div>
        <Button>Export</Button>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

          {positions.loading&&(
               <div className="d-flex justify-content-center"><Spinner color="primary"/></div>
            )}
            {
              positions.error&&(
                  <div className="text-danger">Error occured...</div>
              )  
            }
            
            {positions?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.name}</td>
                {/* <td>xx</td>
                <td>xx</td> */}
                <td className="Actions">
                  <Button onClick={()=>editPosition(item.id)} className="Edit">Edit</Button>
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

export default Position;
