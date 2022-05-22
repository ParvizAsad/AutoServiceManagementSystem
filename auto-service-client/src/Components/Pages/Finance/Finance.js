import React from "react";
import { Link } from "react-router-dom";
import { CardGroup, Card, CardBody, CardTitle, Button } from "reactstrap";
import { GiMoneyStack } from "react-icons/gi";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

function Finance() {
  return (
    <>
      <div className="ForHeading">
        <h1>Finance</h1>
      </div>
      <CardGroup id="moduleCards">
        <Link className="classForLink" to="accounting">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Acounting
              </CardTitle>
              <div className="Icon">
                <GiMoneyStack />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="marketing">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Marketing
              </CardTitle>
              <div className="Icon">
                <RiAdvertisementLine />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="tax">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Taxes
              </CardTitle>
              <div className="Icon">
                <MdAttachMoney />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="cashbox">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                CashBoxes
              </CardTitle>
              <div className="Icon">
                <FaAmazonPay />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
        <Link className="classForLink" to="salary">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Salaries
              </CardTitle>
              <div className="Icon">
                <GiReceiveMoney />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}

export default Finance;
