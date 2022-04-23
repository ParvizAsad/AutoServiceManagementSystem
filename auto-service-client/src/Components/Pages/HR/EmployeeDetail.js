import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./HR.scss";

function EmployeeDetail() {

  return (
    <>
      <div className ='ForHeading'>
          <h1>Employee Detail</h1>
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
            </tr>
          </tbody>
          </Table>
      </div>
    </>

  )
}

export default EmployeeDetail