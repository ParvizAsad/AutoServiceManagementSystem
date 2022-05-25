import React, { useCallback } from "react";
import { Table, Button } from "reactstrap";
import { financeService } from "../../../../Api/services/Finances";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

function Accounting() {
  const [finance, setFinance] = React.useState([]);
  const [accountingData, setAccountingData] = React.useState();
  const history = useHistory();

  const getAllAccounting = useCallback(() => {
    financeService.getAllFinances().then(({ data }) => {
      setAccountingData(data);
    });
  }, [setAccountingData]);

  React.useEffect(() => {
    financeService.getAllFinances().then(({ data }) => {
      setFinance(data);
    });
  }, []);

  function editAccounting(id) {
    history.push("/EditAccounting/" + id);
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
          {
            financeService.deleteFinance(id) &&
              getAllAccounting() &&
              history.push("/accounting");
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
          financeService.getAllFinances().then(({ data }) => {
            setFinance(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Accounting</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createaccounting")}>
            Create Accounting
          </Button>
        </div>
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Communal Cost (AZN)</th>
              <th>Additional Cost (AZN)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {finance?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.communalCost}</td>
                <td>{item.additionalCost}</td>
                <td>{moment(item.date).format("MM-DD-yyyy")}</td>
                <td className="Actions">
                  <Button
                    onClick={() => editAccounting(item.id)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Accounting;
