import React from "react";
import { Table, Button } from "reactstrap";
import { INITIAL_ASYNC_VALUES } from "../../../Consts/const";
import "./HR.scss";
import { useHistory } from "react-router-dom";
import { employeeService } from "../../../Api/services/Employee";

function HR() {

  const [employee, setEmployee] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      console.log(data);
      setEmployee(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Human Resourses</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createemployee")} >Create Employee</Button>
          <Button onClick={() => history.push("/position")} >Positions</Button>
          <Button onClick={() => history.push("/createposition")} >Create Position</Button>
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
                <td>{item.Status}</td>
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
