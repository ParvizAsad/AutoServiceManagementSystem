import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { categoryService } from "../../../../Api/services/Categories";
// import "./Employees/Categorys/CreateEmployee.scss";

const newCategory = {
  name: " ",
};

function EditCategory(props) {
  const [category, setCategory] = useState(newCategory);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    categoryService.getCategoryById(id).then((res) => {
      setCategory(res.data);
    });
  }, []);

  const editCategory = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      categoryService.putCategory(id, category).then(() => {
        history.push("/category");
      });
    },
    [category, history]
  );

  function handle(e) {
    const newCategory = { ...category };
    newCategory[e.target.id] = e.target.value;
    setCategory(newCategory);

    // const { name, value } = e.target;
    // setCategory({ ...Category, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {category.name} Category</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editCategory}>
          <FormGroup>
            <Label className="forLabel" for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              onChange={(e) => handle(e)}
              value={category.name}
              type="text"
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditCategory;
