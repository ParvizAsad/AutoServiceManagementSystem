import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./Registration.scss";

function Registration() {

  return (
    <>
<div className ='ForHeading'>
    <h1>Registration</h1>
</div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button>Create Customer</Button>
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
          Customer Name
        </th>
        <th>
          Service 
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

export default Registration