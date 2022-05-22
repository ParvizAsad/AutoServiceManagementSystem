import React, { useCallback, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import "./CreateEmployee.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";
import axios from "axios";
import "./EmployeeDetail.scss";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

const employees = {
  fullName: " ",
  phoneNumber: " ",
  orderNumber: " ",
  birthDate: " ",
  baseSalary: " ",
  location: " ",
  personalDetails: " ",
  educationLevel: " ",
  imageName: " ",
  positionId: " ",
};

function EmployeeDetail(props) {
  let { id } = useParams();
  const url = "https://localhost:44330/api/Employees/";
  const [employee, setEmployee] = useState([]);
  const [data, setData] = useState(employees);
  const [newData, setNewData] = useState(employees);
  const [positions, setPositions] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    axios.get(url + id).then((res) => {
      setData(res.data);
    });
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositions(data);
    });
  }, []);

  return (
    //   <div class="print__section">
    //   <div class="container">
    //     <div class="row">
    //       <div class="col-md-12">
    //         <button onClick={handlePrint} className="print__button">  Print </button>
    //         <div ref={componentRef} className="card">
    //           <div class="float__start">
    //             <h3 class="card-title mb-0">Employee Detail</h3>
    //           </div>
    //           <hr />
    //           <div class="float__infoss">
    //             <ul>
    //             <img src={data.imageName} className=" profilePicture"/>
    //               <li> Name : <span> {data.fullName} </span> </li>
    //               <li> Phone Number : <span> {data.phoneNumber} </span> </li>
    //               <li> BaseSalary : <span> {data.baseSalary} </span> </li>
    //               <li> Date of Birth : <span> {data.birthDate}</span> </li>
    //               <li> Education: <span> </span> {data.educationLevel} </li>
    //               <li> Address : <span> {data.location} </span> </li>
    //               <li> Oredr Number : <span> {data.orderNumber} </span> </li>
    //               <li> Personal Details : <span> {data.personalDetails} </span> </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="ForHeading">
        <h1>Employee Detail</h1>
      </div>
      <button onClick={handlePrint} className="print__button">
        {" "}
        Print{" "}
      </button>
      <div className="DetailPage" ref={componentRef}>
        <Card className="forCard">
          <CardImg
            className="forImg"
            alt="Card image cap"
            src={data.imageName}
            top
            width="100%"
          />
          <CardBody>
            <CardTitle className="Title" tag="h5">
              Employee FullName: {data.fullName}
            </CardTitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Position:{" "}
              {positions
                ?.filter((position) => position.id === data.positionId)
                .map((position) => (
                  <span>{position.name}</span>
                ))}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Phone Number: {data.phoneNumber}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Order Number: {data.orderNumber}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Phone Number: {data.phoneNumber}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Location: {data.location}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              BaseSalary: {data.baseSalary}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Education Level: {data.educationLevel}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Birthdate: {moment(data.birthDate).format("MM-DD-yyyy")}
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default EmployeeDetail;
