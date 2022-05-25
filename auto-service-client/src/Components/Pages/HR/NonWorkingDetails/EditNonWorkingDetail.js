import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { nonWorkingDetailService } from "../../../../Api/services/NonWorkingDetails";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
import { employeeService } from "../../../../Api/services/Employee";
import moment from "moment";
// import "./Employees/NonWorkingDetails/EditEmployee.scss";

const newNonWorkingDetail = {
  StartTime: " ",
  EndTime: " ",
  EmployeeId: " ",
  NonWorkingTypeId: " ",
};

function EditNonWorkingDetail(props) {
  const [nonWorkingDetail, setNonWorkingDetail] = useState(newNonWorkingDetail);
  const [nonWorkingType, setnonWorkingType] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);

  const [NonWorkingDetailData, setNonWorkingDetailData] = useState();
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    nonWorkingDetailService.getNonWorkingDetailById(id).then((res) => {
      setNonWorkingDetailData(res.data);
    });
  }, []);

  const getAllNonWorkingDetail = useCallback(() => {
    nonWorkingDetailService.getAllNonWorkingDetails().then(({ data }) => {
      setNonWorkingDetailData(data);
    });
  }, [setNonWorkingDetailData]);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setNonWorkingDetail({ ...nonWorkingDetail, [name]: value });
  };

  React.useEffect(() => {
    nonWorkingTypeService.getAllNonWorkingTypes().then(({ data }) => {
      setnonWorkingType(data);
    });
  }, []);

  const updateNonWorkingDetail = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      nonWorkingDetailService
        .putNonWorkingDetail(id, nonWorkingDetail)
        .then(() => {
          history.push("/nonworkingdetail");
        });
    },
    [history, nonWorkingDetail]
  );

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  function handle(e) {
    // const newposition = { ...position };
    // newposition[e.target.id] = e.target.value;
    // setPosition(newposition);
    const { name, value } = e.target;
    setNonWorkingDetail({ ...nonWorkingDetail, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit Non-Working Detail</h1>
      </div>
      <div className="EditPage">
        <Form onSubmit={updateNonWorkingDetail}>
          <FormGroup>
            <Label for="StartTime">StartTime</Label>
            <Input
              id="StartTime"
              name="StartTime"
              placeholder="StartTime"
              onChange={(e) => handle(e)}
              value={nonWorkingDetail.StartTime}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="EndTime">EndTime</Label>
            <Input
              id="EndTime"
              name="EndTime"
              placeholder="EndTime"
              onChange={(e) => handle(e)}
              value={nonWorkingDetail.EndTime}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="NonWorkingTypeId">Select nonWorkingType</Label>
            <select
              className="NonWorkingTypeId"
              onChange={(e) => handle(e)}
              name="NonWorkingTypeId"
              id="NonWorkingTypeId"
            >
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
            <select
              className="EmployeeId"
              onChange={(e) => handle(e)}
              name="EmployeeId"
              id="EmployeeId"
            >
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

export default EditNonWorkingDetail;
