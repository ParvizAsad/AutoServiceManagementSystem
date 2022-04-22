import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./Service.scss";

function Service() {
  return (
    <>
    <div className ='ForHeading'>
    <h1>Services</h1>
    </div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button>Add Service</Button>
<Button>Add Product</Button>
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
          Date
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
        <td>
          xx
        </td>
        <td className='Actions'>
        <Button>
          Edit
        </Button>
        <Button>
          Delete
        </Button>
        <Button>
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

export default Service