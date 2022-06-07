import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
// import "./Employees/Positions/CreateEmployee.scss";
import { positionService } from "../../../../Api/services/Positions";

const newPosition = {
  Name: " ",
};

function CreatePosition() {
  const [position, setPosition] = useState(newPosition);
  const [error, setError] = useState();

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
      positionService
        .postPosition(position)
        .then(() => {
          getAllPosition();
          history.push("/position");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
        });
    },
    [position, history, getAllPosition]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setPosition({ ...position, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new position</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createPosition}>
          {error}
          <FormGroup>
            <Label className="forLabel" for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreatePosition;
