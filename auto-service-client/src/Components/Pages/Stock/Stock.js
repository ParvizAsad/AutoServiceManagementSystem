import React from "react";
import { Button } from "reactstrap";
import "./Stock.scss";
import { CardGroup, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";

function Stock() {
  return (
    <>
      <div className="ForHeading">
        <h1>Stock</h1>
      </div>
      <CardGroup id="moduleCards">
        <Link className="classForLink" to="product">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Products
              </CardTitle>
              <div className="Icon">
                <MdOutlineProductionQuantityLimits />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="brand">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Brands
              </CardTitle>
              <div className="Icon">
                <SiBrandfolder />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="category">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Categories
              </CardTitle>
              <div className="Icon">
                <BiCategoryAlt />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}

export default Stock;
