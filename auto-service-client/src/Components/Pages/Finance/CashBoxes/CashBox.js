import { Table, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useCallback, useState } from "react";
import { cashBoxService } from "../../../../Api/services/CashBox";
import { customerService } from "../../../../Api/services/Customers";
import { serviceService } from "../../../../Api/services/Services";
import { productService } from "../../../../Api/services/Products";

function CashBox() {
  const [cashBoxes, setCashBoxes] = React.useState([]);
  const [CashBoxData, setCashBoxData] = useState();
  const [customers, setCustomers] = useState();
  const [services, setServices] = useState();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();

  const history = useHistory();
  const getAllCashBox = useCallback(() => {
    cashBoxService.getAllCashBoxes().then(({ data }) => {
      setCashBoxes(data);
    });
  }, [setCashBoxes]);

  React.useEffect(() => {
    cashBoxService.getAllCashBoxes().then(({ data }) => {
      setCashBoxes(data);
      setLoading(false);
    });
  }, []);

  function editCashBox(id) {
    history.push("/EditCashBox/" + id);
  }

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomers(data);
    });
  }, []);

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setServices(data);
    });
  }, []);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProducts(data);
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
          cashBoxService.deleteCashBox(id);
          getAllCashBox();
          history.push("/CashBox");
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
          cashBoxService.getAllCashBoxes().then(({ data }) => {
            setCashBoxes(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Payments</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createcashbox")}>
            Create a new CashBox
          </Button>
          <Button onClick={() => history.push("/convertor")}>
            Currency Calculator
          </Button>
        </div>
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
              <th>Customer</th>
              <th>Service</th>
              <th>Product</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cashBoxes?.map((item, idx) => (
              <tr key={idx}>
                <td scope="row">{item.id}</td>
                {customers
                  ?.filter((customer) => customer.id === item.customerID)
                  .map((customer) => (
                    <td>{customer.fullName}</td>
                  ))}
                {services
                  ?.filter((service) => service.id === item.serviceID)
                  .map((service) => (
                    <td>{service.name}</td>
                  ))}
                {products
                  ?.filter((product) => product.id === item.productID)
                  .map((product) => (
                    <td>{product.name}</td>
                  ))}{" "}
                <td>{item.payment}</td>
                <td className="Actions">
                  <Button onClick={() => editCashBox(item.id)} className="Edit">
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

export default CashBox;
