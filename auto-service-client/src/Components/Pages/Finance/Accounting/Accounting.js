import React, {useState, useCallback } from "react";
import { Table, Button, Spinner } from "reactstrap";
import { financeService } from "../../../../Api/services/Finances";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

function Accounting() {
  const [finance, setFinance] = React.useState([]);
  const [accountingData, setAccountingData] = React.useState();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(1);

  const getAllAccounting = useCallback(() => {
    financeService.getAllFinances().then(({ data }) => {
      setAccountingData(data);
    });
  }, [setAccountingData]);

  const maxCount = finance.length;
  const showMoreItems = () => {
    setVisible((prevalue) => prevalue + 2);
  };

  React.useEffect(() => {
    financeService.getAllFinances().then(({ data }) => {
      setFinance(data);
      setLoading(false);
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
      {loading ? (
          //  <tr className="d-flex justify-content-center"><Spinner color="primary"/></tr>
          <div className="d-flex justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : (
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Communal Cost</th>
              <th>Additional Cost</th>
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
)}
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
    </>
  );
}

export default Accounting;
