import React from 'react'
import {
  Table,
  Button
  } from "reactstrap";

function Marketing() {
  return (
    <>
    <div className ='ForHeading'>
    <h1>Marketing</h1>
    </div>
    <div className='AddingAndSearching'>
      <div className='Adding'>
    <Button>Add Discount</Button>
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
              Percentage
            </th>
            <th>
              Expire Date
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

export default Marketing