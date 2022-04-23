import React from 'react'
import {
  Table,
  Button
  } from "reactstrap";

function Accounting() {
  return (
    <>
    <div className ='ForHeading'>
    <h1>Accounting</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
    <Button>Add xxx</Button>
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
              xxxx
            </th>
            <th>
              xxx
            </th>
            <th>
              xxxx
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
            <Button className='Edit'>
              Edit
            </Button>
            <Button className='Delete'>
              Delete
            </Button>
            <Button className='Detail'>
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

export default Accounting