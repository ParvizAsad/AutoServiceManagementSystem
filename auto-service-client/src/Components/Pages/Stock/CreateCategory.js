import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { categoryService } from "../../../Api/services/Categories";
// import "./Employees/Categorys/CreateEmployee.scss";

const newCategory = {
  Name: " ",
};

function CreateCategory() {
  const [category, setCategory] = useState(newCategory);

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
      categoryService.postCategory(category).then(() => {
        getAllCategory();
        history.push("/Category");
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

export default CreateCategory;