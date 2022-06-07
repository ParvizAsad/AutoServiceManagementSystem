import React from "react";
import { Table, Button, } from "reactstrap";
import { useState } from "react";
import { addServiceCustomerService } from "../../../Api/services/AddServiceCustomer";
import { serviceService } from "../../../Api/services/Services";
import { customerService } from "../../../Api/services/Customers";
import { productService } from "../../../Api/services/Products";
import { addProductCustomerService } from "../../../Api/services/AddProductCustomer";
import moment from "moment";

function CustomerService(props) {
  const [customer, setCustomer] = useState();
  const [service, setService] = useState();
  const [product, setProduct] = useState();
  const [customersService, setCustomersService] = useState();
  const [customersProduct, setCustomersProduct] = useState();

  function AddProductCustomer(id) {
    props.history.push("/AddProductCustomer/" + id);
  }
  function AddServiceCustomer(id) {
    props.history.push("/AddServiceCustomer/" + id);
  }

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomer(data?.filter((x) => x.id === props.match.params.id));
      console.log(data?.filter((x) => x.id === props.match.params.id));
    });
  }, []);

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setService(data);
    });
  }, []);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProduct(data);
    });
  }, []);

  React.useEffect(() => {
    addServiceCustomerService.getAllAddServiceCustomeres().then(({ data }) => {
      setCustomersService(
        data.filter((service) => service.customerID === props.match.params.id)
      );
    });
  }, []);

  React.useEffect(() => {
    addProductCustomerService.getAllAddProductCustomeres().then(({ data }) => {
      setCustomersProduct(
        data.filter((product) => product.customerID === props.match.params.id)
      );
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Customers</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => AddServiceCustomer(props.match.params.id)}>
            Add Service
          </Button>
          <Button onClick={() => AddProductCustomer(props.match.params.id)}>
            Add Product
          </Button>
        </div>
        <div>
          {customer?.map((item, idx) => (
            <ul>
              <li>Customer: {item.fullName} </li>
              <li>Debt: {item.debt} </li>
            </ul>
          ))}
        </div>
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Service & Product</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {customersService?.map((item, idx) => (
              <tr>
                <td>{idx}</td>
                {service
                  ?.filter((service) => service.id === item.serviceID)
                  .map((service) => (
                    <td>{"Service:  " + service.name}</td>
                  ))}
                {service
                  ?.filter((service) => service.id === item.serviceID)
                  .map((service) => (
                    <td>{moment(service.date).format("MM-DD-yyyy hh:mm")}</td>
                  ))}
                {service
                  ?.filter((service) => service.id === item.serviceID)
                  .map((service) => (
                    <td>{service.price}</td>
                  ))}
              </tr>
            ))}
            {customersProduct?.map((item, idx) => (
              <tr>
                <td>{idx}</td>
                {product
                  ?.filter((product) => product.id === item.productID)
                  .map((product) => (
                    <td>{"Product:  " + product.name}</td>
                  ))}
                {product
                  ?.filter((product) => product.id === item.productID)
                  .map((product) => (
                    <td>{moment(product.date).format("MM-DD-yyyy hh:mm")}</td>
                  ))}
                {product
                  ?.filter((product) => product.id === item.productID)
                  .map((product) => (
                    <td>{product.salePrice}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CustomerService;
