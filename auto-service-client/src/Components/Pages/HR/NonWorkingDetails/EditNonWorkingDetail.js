import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { nonWorkingDetailService } from "../../../../Api/services/NonWorkingDetails";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
// import "./Employees/NonWorkingDetails/EditEmployee.scss";

const newNonWorkingDetail = {
  StartTime: " ",
  EndTime: " ",
  NonWokringType: " ",
};

function EditNonWorkingDetail(props) {
  const [nonWorkingDetail, setNonWorkingDetail] = useState(newNonWorkingDetail);
  const [nonWorkingType, setnonWorkingType] = React.useState([]);

  const [NonWorkingDetailData, setNonWorkingDetailData] = useState();
  const history = useHistory();

  const getAllNonWorkingDetail = useCallback(() => {
    nonWorkingDetailService.getAllNonWorkingDetails().then(({ data }) => {
      setNonWorkingDetailData(data);
    });
  }, [setNonWorkingDetailData]);

  const EditNonWorkingDetail = useCallback(
    (e) => {
      e.preventDefault();
      nonWorkingDetailService.postNonWorkingDetail(nonWorkingDetail).then(() => {
        getAllNonWorkingDetail();
        history.push("/NonWorkingDetail");
      });
    },
    [nonWorkingDetail, history, getAllNonWorkingDetail]
  );

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
      nonWorkingDetailService.putNonWorkingDetail(id, nonWorkingDetail).then(() => {
        getAllNonWorkingDetail();
        history.push("/nonworkingdetail");
      });
    },
    [history, getAllNonWorkingDetail]
  );

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
              Detail="text"
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
              Detail="text"
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="positionId">Select Position</Label>
            <select className="positionId" onChange={(e) => handle(e)}  name="positionId" id="positionId">
              <option value="0">--Select Category--</option>
              {nonWorkingType?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button Detail="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditNonWorkingDetail;