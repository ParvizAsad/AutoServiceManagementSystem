import React from "react";
import { Button } from "reactstrap";
// import "./HR.scss";
import { CardGroup } from "reactstrap";
import { useHistory } from "react-router-dom";

function Registration(props) {
  const history = useHistory();
  return (
    <>
      <div className="ForHeading">
        <h1>Reception</h1>
      </div>
      <CardGroup id="moduleCards">

        <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/customer")}>
            Add Customer
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

      </CardGroup>
    </>
  );
}

export default Registration;
