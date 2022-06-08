import { Form, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import "./convertor.scss";
import axios from "axios";
import moment from "moment";
import XMLParser from 'react-xml-parser';

const newCurrency = {
  currencyValue: 0,
};

function Convertor() {
  const [currency, setCurrency] = useState(newCurrency);
  const [state, setState] = useState(true);
  const [dollarValue, setDollarValue]=useState(1);
  function changeCurrencyValue(){
    setState(!state);
  };

  let newDate = new Date()
 let today =moment(newDate).format("DD.MM.YYYY");
 const cbarUrl= "https://www.cbar.az/currencies";
 
  React.useEffect(() => {
   axios.get(`${cbarUrl}/${today}.xml`).then(resp => {
     console.log(resp);
    const jsonDataFromXml = new XMLParser().parseFromString(resp.data);
    setDollarValue(jsonDataFromXml.children[1].children[0].children[2].value)
      });
  }, [setDollarValue]);

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
            <h2>{currency.currencyValue*dollarValue}</h2>
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
            <h2>{currency.currencyValue/dollarValue}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Convertor;
