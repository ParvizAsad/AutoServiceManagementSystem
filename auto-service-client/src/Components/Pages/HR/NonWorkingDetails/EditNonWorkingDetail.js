import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { nonWorkingDetailService } from "../../../../Api/services/NonWorkingDetails";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
import { employeeService } from "../../../../Api/services/Employee";
import moment from "moment";

const newNonWorkingDetail = {
  StartTime: "",
  EndTime: "",
  EmployeeId: " ",
  NonWorkingTypeId: " ",
};

function EditNonWorkingDetail(props) {
  const [nonWorkingDetail, setNonWorkingDetail] = useState(newNonWorkingDetail);
  const [nonWorkingType, setnonWorkingType] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    nonWorkingDetailService.getNonWorkingDetailById(id).then((res) => {
      setNonWorkingDetail(res.data);
    });
  }, []);

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
    const { name, value } = e.target;
    setNonWorkingDetail({ ...nonWorkingDetail, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit Non-Working Detail</h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={updateNonWorkingDetail}>
          <FormGroup>
            <Label className="forLabel" for="StartTime">StartTime</Label>
            <Input
              id="StartTime"
              name="StartTime"
              placeholder="StartTime"
              onChange={(e) => handle(e)}
              value={moment(nonWorkingDetail.StartTime).format("YYYY-MM-DD")}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="EndTime">EndTime</Label>
            <Input
              id="EndTime"
              name="EndTime"
              placeholder="EndTime"
              onChange={(e) => handle(e)}
              value={moment(nonWorkingDetail.EndTime).format("YYYY-MM-DD")}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="NonWorkingTypeId">Select nonWorkingType</Label>
            <select
              className="NonWorkingTypeId"
              onChange={(e) => handle(e)}
              name="NonWorkingTypeId"
              id="NonWorkingTypeId"
            >
              {nonWorkingType?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="EmployeeId">Select employee</Label>
            <select
              className="EmployeeId"
              onChange={(e) => handle(e)}
              name="EmployeeId"
              id="EmployeeId"
            >
              {employee?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditNonWorkingDetail;
