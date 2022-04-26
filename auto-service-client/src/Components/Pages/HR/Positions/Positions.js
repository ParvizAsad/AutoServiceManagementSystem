import React from "react";
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { positionService } from "../../../../Api/services/Positions";

function Position() {

  const [positions, setPositions] = useState([]);
  const history = useHistory();

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositions(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Positions</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createposition")} >Create position</Button>
        </div>
        <Button>Export</Button>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.Name}</td>
                <td>xx</td>
                <td>xx</td>
                <td className="Actions">
                  <Button className="Edit">Edit</Button>
                  <Button className="Delete">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Position;
