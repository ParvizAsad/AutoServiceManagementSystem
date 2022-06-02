import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import { customerService } from "../../../Api/services/Customers";
import CurrencyInput from "react-currency-input-field";

const customer = {
  id: " ",
  fullName: " ",
  phoneNumber: " ",
  email: " ",
  debt: " ",
};
function AddServiceCustomer(props) {
  const [data, setData] = useState(customer);
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
   <>
   <div>
    ID: {data.id} || FullName: {data.fullName}  || Debt: {data.debt}
   </div>
   <div>
    
   </div>
   
   
   </>
  )
}

export default AddServiceCustomer