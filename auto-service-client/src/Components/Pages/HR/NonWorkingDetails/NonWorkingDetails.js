import React from "react";
import { Table, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { nonWorkingDetailService } from "../../../../Api/services/NonWorkingDetails";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";
import moment from "moment";
import { employeeService } from "../../../../Api/services/Employee";

function NonWorkingDetail() {
  const [nonWorkingDetails, setNonWorkingDetails] = useState([]);
  const [employee, setEmployee] = useState();
  const [nonWorkingTypes, setnonWorkingTypes] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  React.useEffect(() => {
    nonWorkingDetailService.getAllNonWorkingDetails().then(({ data }) => {
      setNonWorkingDetails(data);
      setLoading(false);
    });
  }, []);

  function editNonWorkingDetail(id) {
    history.push("/EditNonWorkingDetail/" + id);
  }

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  React.useEffect(() => {
    nonWorkingTypeService.getAllNonWorkingTypes().then(({ data }) => {
      setnonWorkingTypes(data);
    });
  }, []);

  const deleteButton = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          {
            nonWorkingDetailService.deleteNonWorkingDetail(id) &&
              history.push("/nonworkingdetail");
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      })
      .finally(() => {
        setTimeout(() => {
          nonWorkingDetailService.getAllNonWorkingDetails().then(({ data }) => {
            setNonWorkingDetails(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>NonWorkingDetails</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createNonWorkingDetail")}>
            Create NonWorkingDetail
          </Button>
        </div>
        <Button>Export</Button>
      </div>
      <div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <Table className="TableForItems">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Non-Working Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {nonWorkingDetails?.map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{item.id}</th>

                  {employee
                    ?.filter((employee) => employee.id === item.employeeId)
                    .map((employee) => (
                      <td>{employee.fullName}</td>
                    ))}
                  <td>{moment(item.startTime).format("YYYY-MM-DD")}</td>
                  <td>{moment(item.endTime).format("YYYY-MM-DD")}</td>
                  {nonWorkingTypes
                    ?.filter(
                      (nonWorkingType) =>
                        nonWorkingType.id === item.nonWorkingTypeId
                    )
                    .map((nonWorkingType) => (
                      <td>{nonWorkingType.name}</td>
                    ))}
                  <th className="Actions">
                    <Button
                      onClick={() => editNonWorkingDetail(item.id)}
                      className="Edit"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteButton(item.id)}
                      className="Delete"
                    >
                      Delete
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

export default NonWorkingDetail;
