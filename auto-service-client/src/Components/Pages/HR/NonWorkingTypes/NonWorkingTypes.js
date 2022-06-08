import React from "react";
import { Table, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { nonWorkingTypeService } from "../../../../Api/services/NonWorkingTypes";

function NonWorkingType() {
  const [nonWorkingTypes, setNonWorkingTypes] = useState([]);
  const [searchNonWorkingType, setSearchNonWorkingType] = useState(" ");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  React.useEffect(() => {
    nonWorkingTypeService.getAllNonWorkingTypes().then(({ data }) => {
      setNonWorkingTypes(data);
      setLoading(false);
    });
  }, []);

  function editNonWorkingType(id) {
    history.push("/EditNonWorkingType/" + id);
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
            nonWorkingTypeService.deleteNonWorkingType(id) &&
              history.push("/nonworkingtype");
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
          nonWorkingTypeService.getAllNonWorkingTypes().then(({ data }) => {
            setNonWorkingTypes(data);
          });
        }, 500);
      });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Non-Working Types</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createNonWorkingType")}>
            Create NonWorkingType
          </Button>
        </div>
        <Button>Export</Button>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchNonWorkingType(event.target.value);
          }}
        />
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
                <th>NonWorkingType</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {nonWorkingTypes
                ?.filter((val) => {
                  if (searchNonWorkingType === " ") {
                    return val;
                  } else if (
                    val.name
                      .toLowerCase()
                      .includes(searchNonWorkingType.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx}</th>
                    <td>{item.name}</td>
                    {/* <td>xx</td>
                    <td>xx</td> */}
                    <td className="Actions">
                      <Button
                        onClick={() => editNonWorkingType(item.id)}
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
    </>
  );
}

export default NonWorkingType;
