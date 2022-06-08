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
  const [role, setRole] = React.useState([]);
  const [userRole, setUserRole] = React.useState([]);
  const [userData, setUserData] = useState();
  const [searchUser, setSearchUser] = useState(" ");
  const history = useHistory();

  React.useEffect(() => {
    userService.getAllUsers().then(({ data }) => {
      setUser(data);
      // console.log(data);
    });
  }, []);

  React.useEffect(() => {
    userService.getAllRole().then(({ data }) => {
      // console.log(data);
      setRole(data);
    });
  }, []);

  React.useEffect(() => {
    userService.GetAllUserRole().then(({ data }) => {
      // console.log(data);
      setUserRole(data);
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
        confirmButtonText: "Yes, Block User!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Blocked!",
            "Your file has been blocked.",
            "success"
          );
          {
            userService.deleteUser(id);
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
      }).finally(() => {
        setTimeout(() => {
          userService.getAllUsers().then(({ data }) => {
            setUser(data);
          });
        }, 3000);
      });
  };

 
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
                if (searchUser === " ") {
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
                  <td>{item.fullName}</td>
                  <td>{item.userName}</td>
           {userRole?.filter((userRol)=>userRol.userId==item.id).map((userRol)=>
             //   {role?.filter((role)=>role.id==userRoles.roleId).map((role)=>
                  <td>{console.log(userRol)}</td>
 // )}
)}
                  <td className="Actions">
                    <Button 
                    // onClick={() => editUser(item.id)} 
                    className="Edit">
                      Edit 
                    </Button>
                    {
                    item.isDeleted ? 
                    <Button
                    style={{background: "red"}}
                      onClick={() => deleteButton(item.id)}
                      className="Delete"
                    >
                      Block
                    </Button>
                    :  <Button
                    style={{background: "green"}}
                      onClick={() => deleteButton(item.id)}
                      className="Delete"
                    >
                      Block
                    </Button>}
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
