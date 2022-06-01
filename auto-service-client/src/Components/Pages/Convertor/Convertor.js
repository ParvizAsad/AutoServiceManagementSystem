import { Form, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import "./convertor.scss";

const newCurrency = {
  currencyValue: 0,
};

function Convertor() {
  const [currency, setCurrency] = useState(newCurrency);
  const [state, setState] = useState(true);

  function changeCurrencyValue(){
    setState(!state);
  };

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCurrency({ ...currency, [name]: value });
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
        <h1>Make currency conversion</h1>
      </div>
      {state ? (
        <div className="CreatePage">
          <Form className="forForm">
            <Label className="forLabel" for="currencyValue">
              Input in USD
            </Label>
            <Input
              id="currencyValue"
              name="currencyValue"
              placeholder="input In USD"
              onChange={getElementValues}
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </Form>
          <Button onClick={changeCurrencyValue} className="changeCurrency" type="submit">
            from AZN to USD
          </Button>

          <div className="Result">
            <h2>{currency.currencyValue*1.7}</h2>
          </div>
        </div>
      ) : (
        <div className="CreatePage">
          <Form className="forForm">
            <Label className="forLabel" for="currencyValue">
              Input in AZN
            </Label>
            <Input
              id="currencyValue"
              name="currencyValue"
              placeholder="input In USD"
              onChange={getElementValues}
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </Form>
          <Button onClick={changeCurrencyValue}  className="changeCurrency" type="submit">
            from USD to AZN
          </Button>

          <div className="Result">
            <h2>{currency.currencyValue/1.7}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Convertor;
