import React from 'react'
import {
Table,
Button
} from "reactstrap";
import { INITIAL_ASYNC_VALUES } from '../../../Consts/const';
import "./HR.scss";
import { useHistory } from "react-router-dom";

function HR() {
  const [employeesData, setEmployeesData]=React.useState(INITIAL_ASYNC_VALUES)
  const { push } = useHistory();

  const handleChangeDetail = React.useCallback(() => {
    push("employeedetail", true);
  }, [push]);

  const handleCreateDetail = React.useCallback(() => {
    push("createemployee", true);
  }, [push]);

  return (
    <>
      <div className ='ForHeading'>
          <h1>Human Resourses</h1>
      </div>
      <div className='AddingAndSearching'>
        <div className='Adding'>
      <Button onClick={handleCreateDetail}>Create Employee</Button>
        </div>
        <Button>Export</Button>
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

export default HR