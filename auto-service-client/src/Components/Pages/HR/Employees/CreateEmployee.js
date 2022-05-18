import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateEmployee.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImageSrc from "../../../../Assets/Images/HR/defaultImage.png";
// const defaultImageSrc= '../../../../Assets/Images/HR/defaultImage.png'

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
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

function CreateEmployee() {
  const [employee, setEmployee] = useState(employees);
  const [position, setPosition] = React.useState([]);
  const [error, setError] = useState();
  const [positionData, setPositionData] = useState();

  const [employeeData, setEmployeeData] = useState();
  const history = useHistory();

  const notify = () => {
    toast("evvel", {
      position: "top-centre",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployeeData(data);
    });
  }, [setEmployeeData]);

  const createEmployee = useCallback(
    (e) => {
      e.preventDefault();
      employeeService
        .postEmployee(employee)
        .then(() => {
          // setTimeout(() => {
          //   toast('evvel', {
          //     position: "top-centre",
          //     autoClose: 5000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     });
          // }, 5000);

          // toast("TESTTESTTEST so easy!");

          history.push("/employee");

          //  toast("TEssssEST so easy!");
          //  toast('sora1!', {
          //   position: "top-left",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   });

          //  setTimeout(() => {
          //   toast('sora2!', {
          //     position: "top-left",
          //     autoClose: 5000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     });
          // }, 5000);
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.status === 400) {
            toast.error(`${e.response.data.errors.Name}`, {
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
          }
        });
    },
    [employee, history]
  );
  const getElementValues = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    console.log(employee);
  };

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      console.log(data);
      setPosition(data);
    });
  }, []);

  const getAllPositions = useCallback(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositionData(data);
    });
  }, [setPositionData]);

const showPreview= e=>{
  if(e.target.files && e.target.files[0]){
    let imageFile= e.target.files[0];
    const reader= new FileReader();
    reader.onload = x => {
      setEmployee({
        ...employee,
        imageFile,
        imageName: x.target.result,
        imageSrc: x.target.result
      })
    }
    reader.readAsDataURL(imageFile)
  }
  else{
    setEmployee({
      ...employee,
      imageFile: null,
      imageSrc: defaultImageSrc
    })
  }
}

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Employee</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createEmployee}>
          <FormGroup>
            <Label for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="imageName">Image</Label>
            <img src={employee.imageSrc} className=" profilePicture"
            />
            <Input
              type="file"
              name="imageName"
              accept="image/*" 
              id="imageName"
              onChange={showPreview}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate">BirthDate</Label>
            <Input
              id="birthDate"
              name="birthDate"
              placeholder="birthDate"
              onChange={getElementValues}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="baseSalary">Base Salary</Label>
            <Input
              id="baseSalary"
              name="baseSalary"
              placeholder="Base Salary"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="positionId">Select Position</Label>
            <select
              className="positionId"
              onChange={getElementValues}
              name="positionId"
              id="positionId"
            >
              <option value="0">--Select Position--</option>
              {position?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              name="orderNumber"
              placeholder="orderNumber"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="location"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="educationLevel">Education Level</Label>
            <Input
              id="educationLevel"
              name="educationLevel"
              placeholder="Education"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="personalDetails">Personal Detail</Label>
            <Input
              onChange={getElementValues}
              id="personalDetails"
              name="personalDetails"
              type="textarea"
            />
          </FormGroup>
          <Button onClick={notify} type="submit">
            Submit
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </>
  );
}

export default CreateEmployee;
