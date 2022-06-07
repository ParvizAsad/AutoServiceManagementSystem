import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { taxService } from "../../../../Api/services/Taxes";

const newTax = {
  Name: " ",
  taxValue: " ",
};

function CreateTax() {
  const [tax, setTax] = useState(newTax);
  const [error, setError] = useState([]);

  const [taxData, setTaxData] = useState();
  const history = useHistory();

  const getAllTax = useCallback(() => {
    taxService.getAllTaxes().then(({ data }) => {
      setTaxData(data);
    });
  }, [setTaxData]);

  const createTax = useCallback(
    (e) => {
      e.preventDefault();
      taxService
        .postTax(tax)
        .then(() => {
          getAllTax();
          history.push("/tax");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
        });
    },
    [tax, history, getAllTax]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setTax({ ...tax, [name]: value });
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="ForHeading">
        <h1>Create a new tax</h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={createTax}>
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
          {error}
          <FormGroup>
            <Label className="forLabel" for="taxValue">Tax Value %</Label>
            <Input
              id="taxValue"
              name="taxValue"
              placeholder="Tax value"
              onChange={getElementValues}
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default CreateTax;
