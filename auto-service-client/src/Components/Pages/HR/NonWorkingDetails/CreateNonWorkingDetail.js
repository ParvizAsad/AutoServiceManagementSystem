import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { nonWorkingDetailService } from "../../../../Api/services/NonWorkingDetails";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
import { employeeService } from "../../../../Api/services/Employee";
// import "./Employees/NonWorkingDetails/CreateEmployee.scss";

const newNonWorkingDetail = {
  StartTime: " ",
  EndTime: " ",
  EmployeeId: " ",
  NonWorkingTypeId: " ",
};

function CreateNonWorkingDetail() {
  const [NonWorkingDetail, setNonWorkingDetail] = useState(newNonWorkingDetail);
  const [nonWorkingType, setnonWorkingType] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);

  const [NonWorkingDetailData, setNonWorkingDetailData] = useState();
  const history = useHistory();

  const getAllNonWorkingDetail = useCallback(() => {
    nonWorkingDetailService.getAllNonWorkingDetails().then(({ data }) => {
      setNonWorkingDetailData(data);
    });
  }, [setNonWorkingDetailData]);

  const createNonWorkingDetail = useCallback(
    (e) => {
      e.preventDefault();
      nonWorkingDetailService.postNonWorkingDetail(NonWorkingDetail).then(() => {
        getAllNonWorkingDetail();
        history.push("/nonworkingdetail");
      });
    },
    [NonWorkingDetail, history, getAllNonWorkingDetail]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setNonWorkingDetail({ ...NonWorkingDetail, [name]: value });
    console.log(NonWorkingDetail);
  };

  React.useEffect(() => {
    nonWorkingTypeService.getAllNonWorkingTypes().then(({ data }) => {
      setnonWorkingType(data);
    });
  }, []);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Non-Working Detail</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createNonWorkingDetail}>
          <FormGroup>
            <Label for="StartTime">StartTime</Label>
            <Input
              id="StartTime"
              name="StartTime"
              placeholder="StartTime"
              onChange={getElementValues}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="EndTime">EndTime</Label>
            <Input
              id="EndTime"
              name="EndTime"
              placeholder="EndTime"
              onChange={getElementValues}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="NonWorkingTypeId">Select nonWorkingType</Label>
            <select className="NonWorkingTypeId" onChange={getElementValues}  name="NonWorkingTypeId" id="NonWorkingTypeId">
              <option value="0">--Select nonWorkingType--</option>
              {nonWorkingType?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="EmployeeId">Select employee</Label>
            <select className="EmployeeId" onChange={getElementValues}  name="EmployeeId" id="EmployeeId">
              <option value="0">--Select employee--</option>
              {employee?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateNonWorkingDetail;