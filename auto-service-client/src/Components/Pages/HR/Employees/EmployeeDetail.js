import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FormGroup, Form, Label, Input,  FormText,  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button } from "reactstrap";
import "./CreateEmployee.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";
import axios, { Axios } from "axios";
import "./EmployeeDetail.scss";

const employees = {
  fullName: "",
  phoneNumber: "",
  orderNumber: "",
  birthDate: "",
  baseSalary: "",
  location: "",
  personalDetails: "",
  educationLevel: "",
  positionId: "",
};

function EmployeeDetail(props) {
  const url = "https://localhost:44330/api/Employees/";
  const [employee, setEmployee] = useState([]);
  const [data, setData] = useState(employees);
  const [position, setPosition] = React.useState([]);
  const [positionData, setPositionData] = useState();
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(url + id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
    //   .catch((er) => console.error(err));
  }, []);

  return (
    <>
      <div className ='ForHeading'>
          <h1>Employee Detail</h1>
      </div>
      <div className='DetailPage'>
      <Card>
        <CardImg
          alt="Card image cap"
          src=""
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            Employee FullName: {data.fullName}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Position: {data.positionId}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Phone Number: {data.phoneNumber}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Order Number: {data.orderNumber}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Phone Number: {data.phoneNumber}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Location: {data.location}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            BaseSalary: {data.baseSalary}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Education Level: {data.educationLevel}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Birthdate: {data.birthDate}
          </CardSubtitle>


          <CardText>
          Non-working-detail: 
          </CardText>
        </CardBody>
      </Card>
      </div>
    </>

  )
}

export default EmployeeDetail