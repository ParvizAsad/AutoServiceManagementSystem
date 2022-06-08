import React from "react";
import { Table, Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { customerService } from "../../../Api/services/Customers";
import Swal from "sweetalert2";
import { useState } from "react";

function Customer(props) {
  const [customers, setCustomers] = React.useState([]);
  const [searchCustomer, setSearchCustomer] = useState(" ");
  const [visible, setVisible] = useState(2);

  const history = useHistory();
  const maxCount = customers.length;
  const showMoreItems = () => {
    setVisible((prevalue) => prevalue + 2);
  };

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomers(data);
    });
  }, []);

  function EditCustomer(id) {
    props.history.push("/EditCustomer/" + id);
  }

  function AddServiceCustomer(id) {
    props.history.push("/AddServiceCustomer/" + id);
  }

  function AddProductCustomer(id) {
    props.history.push("/AddProductCustomer/" + id);
  }

  function CustomerDetail(id) {
    props.history.push("/CustomerDetail/" + id);
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
            customerService.deleteCustomer(id) && history.push("/customer");
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
          customerService.getAllCustomers().then(({ data }) => {
            setCustomers(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Customers</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createcustomer")}>
            Create Customer
          </Button>
        </div>
        <Button onClick={() => history.push("/ExportCustomer")}>Export</Button>
        <input
          type="text"
          placeholder="Search.."
          id="CustomerSearch"
          onChange={(event) => {
            setSearchCustomer(event.target.value);
          }}
        />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Debt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers
              ?.filter((val) => {
                if (searchCustomer === " ") {
                  return val;
                } else if (
                  val.fullName
                    .toLowerCase()
                    .includes(searchCustomer.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{item.id}</th>
                  <td>{item.fullName}</td>
                  <td>{item.debt}</td>
                  <td className="Actions">
                    <Button
                      onClick={() => EditCustomer(item.id)}
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
                      onClick={() => CustomerDetail(item.id)}
                      className="Detail"
                    >
                      Detail
                    </Button>
                    <Button
                      onClick={() => AddServiceCustomer(item.id)}
                      className="addService"
                    >
                      Add Service
                    </Button>
                    <Button
                      onClick={() => AddProductCustomer(item.id)}
                      className="addProduct"
                    >
                      Add Product
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
    </>
  );
}

export default Customer;
