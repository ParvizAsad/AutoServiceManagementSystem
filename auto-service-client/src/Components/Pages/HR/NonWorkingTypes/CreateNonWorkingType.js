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
  const [error, setError] = useState();

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
      nonWorkingTypeService
        .postNonWorkingType(NonWorkingType)
        .then(() => {
          getAllNonWorkingType();
          history.push("/NonWorkingType");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
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
        <Form className="forForm" onSubmit={createNonWorkingType}>
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

export default CreateNonWorkingType;
