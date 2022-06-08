import { Table, Button, Spinner } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useCallback, useState } from "react";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
import moment from "moment";

function Salary() {
  const [salaries, setSalaries] = React.useState([]);

  const [SalaryData, setSalaryData] = useState();
  const [employee, setEmployee] = useState();
  const [visible, setVisible] = useState(2);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getAllSalary = useCallback(() => {
    salaryService.getAllSalaries().then(({ data }) => {
      setSalaryData(data);
    });
  }, [setSalaryData]);

  const maxCount = salaries.length;
  const showMoreItems = () => {
    setVisible((prevalue) => prevalue + 2);
  };

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  React.useEffect(() => {
    salaryService.getAllSalaries().then(({ data }) => {
      setSalaries(data);
      setLoading(false);
    });
  }, []);


  React.useEffect(() => {
    salaryService.getAllSalaries().then(({ data }) => {
      setSalaries(data);
    });
  }, []);

  function editSalary(id) {
    history.push("/EditSalary/" + id);
  }

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
          salaryService.deleteSalary(id);
          getAllSalary();
          history.push("/Salary");
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
          salaryService.getAllSalaries().then(({ data }) => {
            setSalaries(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Salaries</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createSalary")}>
            Create a new Salary
          </Button>
        </div>
        <input type="text" placeholder="Search.." />
      </div>

      {loading ? (
          //  <tr className="d-flex justify-content-center"><Spinner color="primary"/></tr>
          <div className="d-flex justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : ( <div>

      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th> # </th>
              <th> Employee</th>
              <th> Date </th>
              <th> Bonus </th>
              <th> Overtime </th>
              <th> NetSalary </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {salaries?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{item.id}</th>
                {employee
                  ?.filter((employee) => employee.id === item.employeeID)
                  .map((employee) => (
                    <td>{employee.fullName}</td>
                  ))}
                <td>{moment(item.date).format("MM-DD-yyyy")}</td>
                <td>{item.bonus}</td>
                <td>{item.overtime}</td>
                <td>{item.netSalary}</td>
                <td>{item.salaryValue}</td>
                <td className="Actions">
                  <Button onClick={() => editSalary(item.id)} className="Edit">
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteButton(item.id)}
                    className="Delete"
                  >
                    Delete
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
            </Link>          </span>
        ) : (
          <span></span>
        )}
      </div>
      
      </div>)}
    </>
  );
}

export default Salary;
