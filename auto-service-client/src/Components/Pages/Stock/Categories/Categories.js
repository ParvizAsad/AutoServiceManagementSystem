import React from "react";
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { categoryService } from "../../../../Api/services/Categories";

function Category() {
  const [Categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState(" ");
  const history = useHistory();

  React.useEffect(() => {
    categoryService.getAllCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  function editCategory(id) {
    history.push("/EditCategory/" + id);
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
            categoryService.deleteCategory(id) && history.push("/category");
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
          categoryService.getAllCategories().then(({ data }) => {
            setCategories(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Categories</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createCategory")}>
            Create Category
          </Button>
        </div>
        <Button>Export</Button>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchCategory(event.target.value);
          }}
        />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Categories?.filter((val) => {
              if (searchCategory == " ") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchCategory.toLowerCase())
              ) {
                return val;
              }
            }).map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.name}</td>
                <td className="Actions">
                  <Button
                    onClick={() => editCategory(item.id)}
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

export default Category;
