import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { financeService } from "../../../../Api/services/Finances";
// import "./Employees/Accountings/CreateEmployee.scss";

const newAccounting = {
  CommunalCost: " ",
  AdditionalCost: " ",
  Date: " ",
};

function EditAccounting(props) {
  const [accounting, setAccounting] = useState(newAccounting);
  
  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    financeService.getFinanceById(id).then((res) => {
      setAccounting(res.data);
      })
  }, []);

  const editAccounting = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      financeService.putFinance(id, accounting).then(() => {
        history.push("/accounting");
      });
    },
    [accounting, history]
  );



  function handle(e) {
    // const newAccounting = { ...Accounting };
    // newAccounting[e.target.id] = e.target.value;
    // setAccounting(newAccounting);
    const { name, value } = e.target;
    setAccounting({ ...accounting, [name]: value });

  }

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Accounting</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editAccounting}>
          <FormGroup>
            <Label for="CommunalCost">CommunalCost</Label>
            <Input
              id="CommunalCost"
              name="CommunalCost"
              placeholder="CommunalCost"
              onChange={(e) => handle(e)}
              value={accounting.communalCost}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="AdditionalCost">AdditionalCost</Label>
            <Input
              id="AdditionalCost"
              name="AdditionalCost"
              placeholder="AdditionalCost"
              onChange={(e) => handle(e)}
              value={accounting.additionalCost}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Date">Date</Label>
            <Input
              id="Date"
              name="Date"
              placeholder="Date"
              onChange={(e) => handle(e)}
              value={accounting.date}
              type="date"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditAccounting;