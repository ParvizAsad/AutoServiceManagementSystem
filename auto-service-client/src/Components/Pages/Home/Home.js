import React from "react";
import { CardGroup, Card, CardBody, CardTitle, Button } from "reactstrap";
import "./Home.scss";
import { Link } from "react-router-dom";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { GiDirectorChair } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";

function Home() {
  return (
    <>
      <div className="ForHeading">
        <h1>Auto Service System Modules</h1>
      </div>
      <CardGroup id="moduleCards">
        <Link className="classForLink" id="first" to="director">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Director
              </CardTitle>
              <div className="Icon">
                <GiDirectorChair />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" id="second" to={"/admin"}>
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Admin
              </CardTitle>
              <div className="Icon">
                <RiAdminFill />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" id="third" to="/HR">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                HR
              </CardTitle>
              <div className="Icon">
                <MdOutlinePeopleAlt />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" id="fourth" to={"finance"}>
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Finance
              </CardTitle>
              <div className="Icon">
                <FaMoneyBillAlt />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" id="fifth" to="stock">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Stock
              </CardTitle>
              <div className="Icon">
                <FaSitemap />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" id="sixth" to="customer">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Reception
              </CardTitle>
              <div className="Icon">
                <MdAppRegistration />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}

export default Home;
