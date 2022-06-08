import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useCallback, useState } from "react";
import { cashBoxService } from "../../../../Api/services/CashBox";
import { customerService } from "../../../../Api/services/Customers";
import { serviceService } from "../../../../Api/services/Services";
import { productService } from "../../../../Api/services/Products";
import { regularCustomerService } from "../../../../Api/services/RegularCustomer";
import { otherCustomerService } from "../../../../Api/services/OtherCustomer";
import moment from "moment";

function CashBox() {
  const [cashBoxes, setCashBoxes] = React.useState([]);
  const [customers, setCustomers] = useState();
  const [services, setServices] = useState();
  const [products, setProducts] = useState();
  const [regularCustomer, setRegularCustomer] = useState();
  const [otherCustomer, setOtherCustomer] = useState();

  const history = useHistory();

  React.useEffect(() => {
    regularCustomerService.getAllRegularCustomers().then(({ data }) => {
      setRegularCustomer(data);
    });
  }, []);

  React.useEffect(() => {
    otherCustomerService.getAllOtherCustomers().then(({ data }) => {
      setOtherCustomer(data);
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
       
          history.push("/CashBox");
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
          <Button onClick={() => history.push("/regularCustomer")}>
            Regular Customer Payment
          </Button>
          <Button onClick={() => history.push("/otherCustomer")}>
            Other Customer Payment
          </Button>
        </div>
        <div className="Adding">
          <Button onClick={() => history.push("/convertor")}>Convertor</Button>
        </div>
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {regularCustomer?.map((item)=>(

<tr key={item.id}>
<td>{item.id}</td>
{customers?.filter((x)=> x.id==item.customerID).map((customers)=>
  <td>{customers.fullName}</td>
  )}
  
 <td> {moment(item.createdAt).format("MM-DD-yyyy, hh:mm")}
 </td>
 <td>{item.payment}</td>
</tr>
          ))}
          
          {otherCustomer?.map((item)=>(
            <tr key={item.id}>
            <td>{item.id}</td>
              <td>{item.customerName}</td>
             <td> {console.log(item.createAt)}
             </td>
             <td>{item.payment}</td>
            </tr>
                      ))}

          
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CashBox;
