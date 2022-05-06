import React from 'react'
import { userService } from '../../../Api/services/Users';
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";

function User() {

  const [user, setUser] = React.useState([]);
  const [userData, setUserData] = useState();
  const history = useHistory();

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
          <Button onClick={() => history.push("/createUser")} >Create User</Button>
        </div>
        <input type="text" placeholder="Search.." />
      </div>
      <div>
        <Table className="TableForItems">
          <thead>
            <tr>
              <th>#</th>
              <th>FullName</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{item.fullName}</td>
                <td>{item.Position}</td>
                <td>{item.Status}</td>
                <td className="Actions">
                  {/* <Button onClick={()=>EditUser(item.id)} className="Edit">Edit</Button> */}
                  {/* <Button onClick={()=>deleteButton(item.id) } className="Delete">Delete</Button> */}
                  {/* <Button onClick={()=>UserDetail(item.id)} className="Detail">Detail</Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default User    