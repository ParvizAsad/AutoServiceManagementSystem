/* eslint-disable array-callback-return */
import React from "react";
import { Table, Button } from "reactstrap";
// import "./Product.scss";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { productService } from "../../../../Api/services/Products";
import { useState, useCallback } from "react";

function Product(props) {
  const [products, setProducts] = React.useState([]);
  const [searchProduct, setSearchProduct] = useState(" ");
  const [visible, setVisible] = useState(2);
  // const FileDownload = require('js-file-download');

  const history = useHistory();
  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  const maxCount = products.length;
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
          productService.deleteProduct(id);
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
          productService.getAllProducts().then(({ data }) => {
            setProducts(data);
          });
        }, 500);
      });
  };

  function productDetail(id) {
    props.history.push("/ProductDetail/" + id);
  }

  function editProduct(id) {
    props.history.push("/EditProduct/" + id);
  }

const	fetchexportToExcell = () => {
		fetch('https://localhost:44330/api/Products/ExportToExcell')
			.then(response => {
        console.log(response)
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = response.data;
					a.click();
				});
				//window.location.href = response.url;
		});
	}

  

  const exportToExcell = useCallback(
    (e) => {
      e.preventDefault();
      
      productService
        .exportToExcell({responseType: 'blob'})
        .then((response) => {
    //       const href = URL.createObjectURL(response.data);

    // // create "a" HTML element with href to file & click
    // const link = document.createElement('a');
    // link.href = href;
    // link.setAttribute('download', 'file.xlsx'); //or any other extension
    // document.body.appendChild(link);
    // link.click();

    // // clean up "a" element & remove ObjectURL
    // document.body.removeChild(link);
    // URL.revokeObjectURL(href);
      })
        .catch((res) => {
          console.log(res);
        });
    },
    [history]
  );

  return (
    <>
      <div className="ForHeading">
        <h1>Products</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createproduct")}>
            Create Product
          </Button>
        </div>
        {/* <Button onClick={() => history.push("/ExportProduct")}>Export</Button>  */}
        <Button onClick={fetchexportToExcell} className="btn btn-secondary">
          <i className="fas fa-download" /> fetch Export
        </Button>
        <Button onClick={exportToExcell} className="btn btn-secondary">
          axios Export
        </Button>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchProduct(event.target.value);
          }}
        />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.filter((val) => {
                if (searchProduct === " ") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchProduct.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(0, visible)
              .map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx}</th>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td className="Actions">
                    <Button
                      onClick={() => editProduct(item.id)}
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
                      onClick={() => productDetail(item.id)}
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
    </>
  );
}

export default Product;
