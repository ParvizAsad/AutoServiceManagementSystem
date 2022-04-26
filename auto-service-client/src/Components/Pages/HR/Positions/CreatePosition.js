import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
// import "./Employees/Positions/CreateEmployee.scss";
import { positionService } from "../../../../Api/services/Positions";

const newPosition = {
  Name: " ",
};

function CreatePosition() {
  const [position, setPosition] = useState(newPosition);

  const [positionData, setPositionData] = useState();
  const history = useHistory();

  const getAllPosition = useCallback(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositionData(data);
    });
  }, [setPositionData]);

  const createPosition = useCallback(
    (e) => {
      e.preventDefault();
      positionService.postPosition(position).then(() => {
        getAllPosition();
        history.push("/position");
      });
    },
    [position, history, getAllPosition]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setPosition({ ...position, [name]: value });
    console.log(position);
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new position</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createPosition}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreatePosition;