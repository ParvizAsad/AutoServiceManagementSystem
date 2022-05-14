import React from 'react'
import {
Table,
Button
} from "reactstrap";
// import "./Product.scss";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { productService } from '../../../../Api/services/Products';

function Product(props) {

  const [product, setProduct] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProduct(data);
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
          {productService.deleteProduct(id) &&
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

  function ProductDetail(id){
    console.log(id)
   props.history.push("/ProductDetail/"+id)
  } 

  return (
    <>
    <div className ='ForHeading'>
    <h1>Products</h1>
    </div>
    <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createproduct")} >Create Product</Button>
        </div>
        <Button onClick={() => history.push("/ExportProduct")} >Export</Button>
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
          Product
        </th>
        <th>
          Amount
        </th>
        <th>
          Status
        </th>
        <th>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {product?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.Status}</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
                  <Button onClick={()=>deleteButton(item.id) } className="Delete">Delete</Button>
                  <Button  onClick={()=>ProductDetail(item.id)}  className="Detail">Detail</Button>
                </td>
              </tr>
            ))}
    </tbody>
    </Table>
</div>
</>

  )
}

export default Product