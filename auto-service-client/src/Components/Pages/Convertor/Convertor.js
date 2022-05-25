import { Form, Label, Input, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./convertor.scss";
import axios from "axios";

const newCurrencyInUSD = {
  currencyValue: 0,
};

function Convertor() {
  const [currencyInUSD, setCurrencyInUSD] = useState(newCurrencyInUSD);
  const [state, setState] = useState(true);

  function changeCurrency() {
    setState(!state);
  }

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCurrencyInUSD({ ...currencyInUSD, [name]: value });
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
        <div className="CurrencyDiv">
          <Form className="forFrom">
            <Label className="forLabel" for="currencyValue">
              Input in USD
            </Label>
            <Input
              id="currencyValue"
              name="currencyValue"
              onChange={getElementValues}
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </Form>
          <Button
            onClick={changeCurrency}
            className="changeCurrency"
            type="submit"
          >
            from AZN to USD
          </Button>
          <div className="Result">
            <h2> Result: {currencyInUSD.currencyValue / 1.7}</h2>
          </div>
        </div>
      ) : (
        <div className="CurrencyDiv">
          <Form className="forFrom">
            <Label className="forLabel" for="currencyValue">
              Input in AZN
            </Label>
            <Input
              id="currencyValue"
              name="currencyValue"
              onChange={getElementValues}
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </Form>
          <Button
            onClick={changeCurrency}
            className="changeCurrency"
            type="submit"
          >
            from USD to AZN
          </Button>
          <div className="Result">
            <h2>Result: {currencyInUSD.currencyValue * 1.7}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Convertor;
