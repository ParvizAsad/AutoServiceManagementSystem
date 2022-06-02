import React, { useCallback, useState } from "react";
import { Table, Button } from "reactstrap";
import { discountService } from "../../../../Api/services/Discount";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

function Marketing() {
  const [discounts, setDiscount] = React.useState([]);
  const [searchDiscount, setSearchDiscount] = useState(" ");
  const history = useHistory();

  const getAllDiscount = useCallback(() => {
    discountService.getAllDiscounts().then(({ data }) => {
      setDiscount(data);
    });
  }, [setDiscount]);

  React.useEffect(() => {
    discountService.getAllDiscounts().then(({ data }) => {
      setDiscount(data);
    });
  }, []);

  function editDiscount(id) {
    history.push("/EditDiscount/" + id);
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
            discountService.deletediscount(id) && getAllDiscount();
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
          discountService.getAllDiscounts().then(({ data }) => {
            setDiscount(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Marketing</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/creatediscount")}>
            Create Discount
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchDiscount(event.target.value);
          }}
        />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Expire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts
              ?.filter((val) => {
                if (searchDiscount === " ") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchDiscount.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx}</th>
                  <td>{item.name}</td>
                  <td>{item.percentage}</td>
                  <td>{moment(item.expireDate).format("MM-DD-yyyy")}</td>
                  <td className="Actions">
                    <Button
                      onClick={() => editDiscount(item.id)}
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

export default Marketing;
