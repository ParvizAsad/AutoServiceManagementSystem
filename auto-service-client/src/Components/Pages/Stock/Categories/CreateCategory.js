import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { categoryService } from "../../../../Api/services/Categories";
// import "./Employees/Categorys/CreateEmployee.scss";

const newCategory = {
  Name: " ",
};

function CreateCategory() {
  const [category, setCategory] = useState(newCategory);
  const [error, setError] = useState();

  const [categoryData, setCategoryData] = useState();
  const history = useHistory();

  const getAllCategory = useCallback(() => {
    categoryService.getAllCategories().then(({ data }) => {
      setCategoryData(data);
    });
  }, [setCategoryData]);

  const createCategory = useCallback(
    (e) => {
      e.preventDefault();
      categoryService
        .postCategory(category)
        .then(() => {
          getAllCategory();
          history.push("/Category");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name[0]);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
        });
    },
    [category, history, getAllCategory]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Category</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createCategory}>
          {error}
          <FormGroup>
            <Label  className="forLabel" for="Name">Name</Label>
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

export default CreateCategory;
