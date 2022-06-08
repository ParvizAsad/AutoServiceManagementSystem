import React from "react";
import { Table, Button, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";
import { useHistory, Link } from "react-router-dom";

function Employee(props) {
  const [employees, setEmployees] = React.useState([]);
  const [visible, setVisible] = useState(2);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState();
  const [searchEmployee, setSearchEmployee] = useState(" ");
  const history = useHistory();

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployees(data);
    });
  }, []);

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPosition(data);
    });
  }, []);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployees(data);
      setLoading(false);
    });
  }, []);

  const maxCount = employees.length;
  const showMoreItems = () => {
    setVisible((prevalue) => prevalue + 2);
  };

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
          employeeService.deleteEmployee(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      })
      .finally(() => {
        setTimeout(() => {
          employeeService.getAllEmployee().then(({ data }) => {
            setEmployees(data);
          });
        }, 5000);
      });
  };

  function EditEmployee(id) {
    props.history.push("/EditEmployee/" + id);
  }

  function EmployeeDetail(id) {
    props.history.push("/EmployeeDetail/" + id);
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="ForHeading">
        <h1>Employees</h1>
      </div>
      <div className="AddingAndSearching">
        <button onClick={handlePrint} className="forPrint">
          {" "}
          Print{" "}
        </button>
        <div className="Adding">
          <Button onClick={() => history.push("/createemployee")}>
            Create Employee
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchEmployee(event.target.value);
          }}
        />
        <Button onClick={() => history.push("/ExportEmployee")}>Export</Button>
      </div>

      {loading ? (
        //  <tr className="d-flex justify-content-center"><Spinner color="primary"/></tr>
        <div className="d-flex justify-content-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          <div ref={componentRef}>
            <Table className="TableForItems" id="example">
              <thead>
                <tr>
                  <th>#</th>
                  <th>FullName</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  ?.filter((val) => {
                    if (searchEmployee === " ") {
                      return val;
                    } else if (
                      val.fullName
                        .toLowerCase()
                        .includes(searchEmployee.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(0, visible)
                  .map((item, idx) => (
                    <tr key={idx}>
                      <th scope="row">{item.id}</th>
                      <td>{item.fullName}</td>
                      {position
                        ?.filter((position) => position.id === item.positionId)
                        .map((position) => (
                          <td>{position.name}</td>
                        ))}
                      <td>{item.status}</td>
                      <td className="Actions">
                        <Button
                          onClick={() => EditEmployee(item.id)}
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
                        <Button
                          onClick={() => EmployeeDetail(item.id)}
                          className="Detail"
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="loadMore d-flex justify-content-center">
            {maxCount > visible ? (
              <span>
                <Link className="linkForLaodMore" onClick={showMoreItems}>
                  Load more...
                </Link>
              </span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Employee;
