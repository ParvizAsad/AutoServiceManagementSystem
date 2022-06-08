import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { financeService } from "../../../../Api/services/Finances";
import { toast } from "react-toastify";

const newAccounting = {
  communalCost: " ",
  additionalCost: " ",
  date: " ",
};

function EditAccounting(props) {
  const [accounting, setAccounting] = useState(newAccounting);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    financeService.getFinanceById(id).then((res) => {
      setAccounting(res.data);
    });
  }, []);

  const editAccounting = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      financeService
        .putFinance(id, accounting)
        .then(() => {
          history.push("/accounting");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            toast.error(`${e.response.data.title}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (e.response.status === 500) {
            toast.error(`${e.response.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(`${e.response.data.title}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
        <h1>Edit Accounting</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editAccounting}>
          <FormGroup>
            <Label className="forLabel" for="communalCost">CommunalCost</Label>
            <Input
              id="communalCost"
              name="communalCost"
              placeholder="CommunalCost"
              onChange={(e) => handle(e)}
              value={accounting.communalCost}
              prefix="$"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="additionalCost">AdditionalCost</Label>
            <Input
              id="additionalCost"
              name="additionalCost"
              placeholder="additionalCost"
              onChange={(e) => handle(e)}
              value={accounting.additionalCost}
              prefix="$"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="Date">Date</Label>
            <Input
              id="Date"
              name="Date"
              placeholder="Date"
              onChange={(e) => handle(e)}
              value={accounting.date}
              type="date"
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditAccounting;
