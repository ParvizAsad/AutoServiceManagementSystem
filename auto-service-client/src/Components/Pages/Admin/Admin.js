import React from "react";
import { userService } from "../../../Api/services/Users";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { CardGroup, Card, CardBody, CardTitle } from "reactstrap";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";

function Admin() {
  const [userData, setUserData] = useState();

  const getAllEmployee = useCallback(() => {
    userService.getAllUsers().then(({ data }) => {
      setUserData(data);
    });
  }, [setUserData]);

  return (
    <>
      <div className="ForHeading">
        <h1>Admin</h1>
      </div>
      <CardGroup id="moduleCards">
        <Link className="classForLink" to="user">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Users
              </CardTitle>
              <div className="Icon">
                <MdAdminPanelSettings />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="service">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Services
              </CardTitle>
              <div className="Icon">
                <GiAutoRepair />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="role">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Roles
              </CardTitle>
              <div className="Icon">
                <MdOutlineAdminPanelSettings />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}

export default Admin;
