import React from "react";
import { Button } from "reactstrap";
import "./HR.scss";
import { Link } from "react-router-dom";
import { CardGroup, Card, CardBody, CardTitle } from "reactstrap";
import { FaPeopleCarry } from "react-icons/fa";
import { MdOutlineNaturePeople } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { MdOutlineLocalHospital } from "react-icons/md";

function HR() {
  return (
    <>
      <div className="ForHeading">
        <h1>HR module</h1>
      </div>
      <CardGroup id="moduleCards">
        <Link className="classForLink" to="employee">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Employees
              </CardTitle>
              <div className="Icon">
                <FaPeopleCarry />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="position">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Positions
              </CardTitle>
              <div className="Icon">
                <MdOutlineNaturePeople />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="nonworkingtype">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                NWT
              </CardTitle>
              <div className="Icon">
                <MdOutlineLocalHospital />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="nonworkingdetail">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                NWD
              </CardTitle>
              <div className="Icon">
                <FaBed />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}

export default HR;
