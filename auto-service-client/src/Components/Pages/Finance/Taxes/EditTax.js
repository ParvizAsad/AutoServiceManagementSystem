import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { taxService } from "../../../../Api/services/Taxes";
// import "./Employees/taxs/CreateEmployee.scss";

const NewTax= {
  name: " ",
  taxValue: " ",
};

function EditTax(props) {
  const [tax, setTax] = useState(NewTax);

  const history = useHistory();

  const editTax = useCallback(
    (e) => {
      console.log("sdasd");
      e.preventDefault();
      const id = props.match.params.id;
      taxService.updateTax(id, tax).then(() => {
        history.push("/tax");
        console.log("sasasssssssssas");
      });
    },
    [tax, history]
  );


  useEffect(() => {
    const id = props.match.params.id;
    taxService.getTaxById(id).then((res) => {
      setTax(res.data);
      })
  }, []);

  function handle(e) {
    // const newtax = { ...tax };
    // newtax[e.target.id] = e.target.value;
    // setTax(newtax);
    const { name, value } = e.target;
    setTax({ ...tax, [name]: value });

  }

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new tax</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editTax}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              value={tax.name}
              onChange={(e) => handle(e)}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="taxValue">Tax Value</Label>
            <Input
              id="taxValue"
              name="taxValue"
              placeholder="Tax value"
              onChange={(e) => handle(e)}
              value={tax.taxValue}
              type="number"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditTax;