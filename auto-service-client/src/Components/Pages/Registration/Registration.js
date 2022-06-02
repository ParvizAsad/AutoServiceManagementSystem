import React from "react";
import { Button } from "reactstrap";
// import "./HR.scss";
import { Link } from "react-router-dom";
import { CardGroup, Card, CardBody, CardTitle } from "reactstrap";
import { MdOutlinePeople } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { useHistory } from "react-router-dom";

function Registration(props) {
  const history = useHistory();
  return (
    <>
      <div className="ForHeading">
        <h1>Reception</h1>
      </div>
      <CardGroup id="moduleCards">
        {/* <Link className="classForLink" to="customer">
        <Button>Create customer</Button>
           <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Customers
              </CardTitle>
              <div className="Icon">
                <MdOutlinePeople />
              </div>
              <Button>Create customer</Button>
            </CardBody>
          </Card> 
        </Link> */}

        <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/customer")}>
            Add Service
          </Button>
        </div>
       
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            // setSearchService(event.target.value);
          }}
        />
      </div>
{/* 
        <Link className="classForLink" to="AddServiceCustomer">
          <Card className="moduleCard">
            <CardBody className="moduleCardBody">
              <CardTitle tag="h5" className="moduleCardTitle">
                Add Service to customer
              </CardTitle>
              <div className="Icon">
                <GiAutoRepair />
              </div>
              <Button>Enter</Button>
            </CardBody>
          </Card>
        </Link> */}

      </CardGroup>
    </>
  );
}

export default Registration;
