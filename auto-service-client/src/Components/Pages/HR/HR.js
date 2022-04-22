import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./HR.scss";

function HR() {

  return (
    <>
<div className ='ForHeading'>
    <h1>Human Resourses</h1>
</div>
<div className='AddingAndSearching'>
  <div className='Adding'>
<Button>Create Employee</Button>
  </div>
  <input type="text" placeholder="Search.."/>
  <Button>Export</Button>
</div>
<div>
    <Table className='TableForItems'>
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>
          FullName
        </th>
        <th>
          Position 
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

export default HR