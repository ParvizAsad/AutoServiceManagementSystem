import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { taxService } from "../../../../Api/services/Taxes";
// import "./Employees/taxs/CreateEmployee.scss";
import CurrencyInput from 'react-currency-input-field';

const NewTax= {
  name: " ",
  taxValue: " ",
};

function EditTax(props) {
  const [tax, setTax] = useState(NewTax);
  
  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    taxService.getTaxById(id).then((res) => {
      setTax(res.data);
      })
  }, []);

  const editTax = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      taxService.putTax(id, tax).then(() => {
        history.push("/tax");
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
        <h1>Edit {tax.name} tax</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editTax}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              onChange={(e) => handle(e)}
              value={tax.name}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="taxValue">Tax Value</Label>
            <CurrencyInput
              id="taxValue"
              name="taxValue"
              placeholder="Tax value"
              prefix='$'
              value={tax.taxValue}
              onChange={(e) => handle(e)}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditTax;