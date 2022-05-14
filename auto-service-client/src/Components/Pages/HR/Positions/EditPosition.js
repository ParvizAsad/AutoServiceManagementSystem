import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { positionService } from "../../../../Api/services/Positions";
// import "./Employees/taxs/CreateEmployee.scss";

const NewPosition= {
  name: " ",
};

function EditPosition(props) {
  const [position, setPosition] = useState(NewPosition);

  const history = useHistory();

  const editPosition = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      positionService.putPosition(id, position).then(() => {
        history.push("/position");
      });
    },
    [position, history]
  );


  useEffect(() => {
    const id = props.match.params.id;
    positionService.getPositionById(id).then((res) => {
      setPosition(res.data);
      })
  }, []);

  function handle(e) {
    // const newposition = { ...position };
    // newposition[e.target.id] = e.target.value;
    // setPosition(newposition);
    const { name, value } = e.target;
    setPosition({ ...position, [name]: value });

  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {position.name} position</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editPosition}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              value={position.name}
              onChange={(e) => handle(e)}
              type="text"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditPosition;