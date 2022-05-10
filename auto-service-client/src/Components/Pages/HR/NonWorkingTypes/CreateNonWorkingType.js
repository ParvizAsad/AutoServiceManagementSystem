import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
// import "./Employees/NonWorkingTypes/CreateEmployee.scss";

const newNonWorkingType = {
  Name: " ",
};

function CreateNonWorkingType() {
  const [NonWorkingType, setNonWorkingType] = useState(newNonWorkingType);

  const [NonWorkingTypeData, setNonWorkingTypeData] = useState();
  const history = useHistory();

  const getAllNonWorkingType = useCallback(() => {
    nonWorkingTypeService.getAllNonWorkingTypes().then(({ data }) => {
      setNonWorkingTypeData(data);
    });
  }, [setNonWorkingTypeData]);

  const createNonWorkingType = useCallback(
    (e) => {
      e.preventDefault();
      nonWorkingTypeService.postNonWorkingType(NonWorkingType).then(() => {
        getAllNonWorkingType();
        history.push("/NonWorkingType");
      });
    },
    [NonWorkingType, history, getAllNonWorkingType]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setNonWorkingType({ ...NonWorkingType, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new NonWorkingType</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createNonWorkingType}>
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

export default CreateNonWorkingType;