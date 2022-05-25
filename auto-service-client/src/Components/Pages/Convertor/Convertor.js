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

  // React.useEffect(() => {
  //   setState(!state);
  // }, []);

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
               <Form >
                   <Label  for="currencyValue">Input in USD</Label>
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
                 <Button className="changeCurrency" type="submit">from USD to AZN</Button>
             </div>
        ) : (
          <span></span>
        )}

      <div className="Result">
        <h2>{currencyInUSD.currencyValue}</h2>
      </div>
    </>
  );
}

export default Convertor;
