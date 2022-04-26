import React from "react";
import { Table, Button } from "reactstrap";
import { INITIAL_ASYNC_VALUES } from "../../../Consts/const";
import "./HR.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { employeeService } from "../../../Api/services/Employee";
import { useCallback } from "react";
import { positionService } from "../../../Api/services/Positions";

function HR() {

  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [position, setPosition] = React.useState([]);
  const [positionData, setPositionData] = useState();
const [{id}] =useState();

  const history = useHistory();

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      console.log(data);
      setEmployee(data);
    });
  }, []);

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      console.log(data);
      setPosition(data);
    });
  }, []);

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployeeData(data);
    });
  }, [setEmployeeData]);

  const getAllPositions = useCallback(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositionData(data);
    });
  }, [setPositionData]);

const getPositionById = useCallback(
  (e) => {
    //e.preventDefault();
    positionService.getPositionById(id).then(() => {
      getAllPositions();
      history.push("/hr");
    });
  },
  [id, history.push, getAllPositions]
);


  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createemployee")} >Create Employee</Button>
        </div>
        <Button>Export</Button>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>FullName</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{this.useState.id=item.id} {getPositionById(item.positionId)}</td>
                <td>xx</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
                  <Button className="Delete">Delete</Button>
                  <Button className="Detail">Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default HR;
