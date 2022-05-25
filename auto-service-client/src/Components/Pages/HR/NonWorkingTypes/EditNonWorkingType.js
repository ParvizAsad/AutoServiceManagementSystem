import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
// import "./Employees/taxs/CreateEmployee.scss";

const NewNonWorkingType = {
  name: " ",
};

function EditNonWorkingType(props) {
  const [NonWorkingType, setNonWorkingType] = useState(NewNonWorkingType);

  const history = useHistory();

  const editNonWorkingType = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      nonWorkingTypeService.putNonWorkingType(id, NonWorkingType).then(() => {
        history.push("/nonworkingtype");
      });
    },
    [NonWorkingType, history]
  );

  useEffect(() => {
    const id = props.match.params.id;
    nonWorkingTypeService.getNonWorkingTypeById(id).then((res) => {
      setNonWorkingType(res.data);
    });
  }, []);

  function handle(e) {
    // const newNonWorkingType = { ...NonWorkingType };
    // newNonWorkingType[e.target.id] = e.target.value;
    // setNonWorkingType(newNonWorkingType);
    const { name, value } = e.target;
    setNonWorkingType({ ...NonWorkingType, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {NonWorkingType.name} nonWorkingType</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editNonWorkingType}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              value={NonWorkingType.name}
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
export default EditNonWorkingType;
