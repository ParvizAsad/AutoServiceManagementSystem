import React from 'react'
import {
Table,
Button
} from "reactstrap";
import Service from '../Service/Service';
import "./Registration.scss";
import { useHistory } from "react-router-dom";

function Registration() {

  const { push } = useHistory();
  const handleChangeDetail = React.useCallback(() => {
    push("employeedetail", true);
  }, [push]);

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

export default Registration