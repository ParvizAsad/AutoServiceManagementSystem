import React from "react";
import { userService } from "../../../Api/services/Users";
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";

function User(props) {
  const [user, setUser] = React.useState([]);
  const [userData, setUserData] = useState();
  const [searchUser, setSearchUser] = useState(" ");
  const history = useHistory();

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
            userService.deleteUser(id) && (
              // history.push("/Role")
              <Link to="/Role"></Link>
            );
          }
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  function editUser(id) {
    props.history.push("/EditRole/" + id);
  }

  const getAllEmployee = useCallback(() => {
    userService.getAllUsers().then(({ data }) => {
      setUserData(data);
    });
  }, [setUserData]);

  return (
    <>
      <div className="ForHeading">
        <h1>Users</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/createUser")}>
            Create User
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchUser(event.target.value);
          }}
        />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user
              ?.filter((val) => {
                if (searchUser == " ") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchUser.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx}</th>
                  <td>{item.fullname}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td className="Actions">
                    <Button onClick={() => editUser(item.id)} className="Edit">
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

export default User;
