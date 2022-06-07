import { Table, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { taxService } from "../../../../Api/services/Taxes";
import Swal from "sweetalert2";
import React, {useState } from "react";

function Tax() {
  const [taxes, setTaxes] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTax, setSearchTax] = useState(" ");

  const history = useHistory();

  React.useEffect(() => {
    taxService.getAllTaxes().then(({ data }) => {
      setTaxes(data);
      setLoading(false);
    });
  }, []);

  function editTax(id) {
    history.push("/EditTax/" + id);
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
          taxService.deleteTax(id);
        } else if (
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
          taxService.getAllTaxes().then(({ data }) => {
            setTaxes(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Taxes</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createtax")}>Create Tax</Button>
        </div>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchTax(event.target.value);
          }}
        />
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
              <th>Name</th>
              <th>TaxValue %</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxes
              ?.filter((val) => {
                if (searchTax === " ") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchTax.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx}</th>
                  <td>{item.name}</td>
                  <td>{item.taxValue}</td>
                  <td className="Actions">
                    <Button onClick={() => editTax(item.id)} className="Edit">
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
        </Table>)}
      </div>
    </>
  );
}

export default Tax;
