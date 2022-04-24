import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./Stock.scss";
import { useHistory } from "react-router-dom";
function Stock() {

  const { push } = useHistory();
  const handleChangeDetail = React.useCallback(() => {
    push("productdetail", true);
  }, [push]);

  return (
    <>
    <div className ='ForHeading'>
    <h1>Stock</h1>
    </div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button>Add Product</Button>
<Button>Add Category</Button>
<Button>Add Brand</Button>
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
      <tr>
        <th scope="row">
          1
        </th>
        <td>
          xx
        </td>
        <td>
          xx
        </td>
        <td>
          xx
        </td>
        <td className='Actions'>
        <Button className='Edit'>
          Edit
        </Button>
        <Button className='Delete'>
          Delete
        </Button>
        <Button onClick={handleChangeDetail} className='Detail'>
          Detail
        </Button>
        </td>
      </tr>
    </tbody>
    </Table>
</div>
</>

  )
}

export default Stock