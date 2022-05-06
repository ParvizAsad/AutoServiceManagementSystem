import React from 'react'
import { userService } from '../../../Api/services/Users';
import { Table, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

function Admin() {

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
<div className ='ForHeading'>
    <h1>Admin</h1>
</div>
    <CardGroup id='moduleCards'>
         <Link to="user">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Users
        </CardTitle>
        <div className="Icon">
        </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to="role">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Roles
                  </CardTitle>
                  <div className="Icon">
        </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
  </CardGroup>
</>
  )
}

export default Admin    