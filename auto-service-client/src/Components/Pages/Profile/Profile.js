import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import {
  CardGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardImg,
} from "reactstrap";
import { userService } from "../../../Api/services/Users";

function Profile() {
  const [user, setUser] = useState();
  const history = useHistory();

  React.useEffect(() => {
    userService.getUserById().then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Profile</h1>
      </div>
      <CardGroup id="moduleCards">
        <div className="DetailPage">
          <Card className="forCard">
            <CardImg
              className="forImg"
              alt="Card image cap"
              src="{data.imageName}"
              top
              width="100%"
            />
            <CardBody>
              <CardTitle className="Title" tag="h5">
                Fullname: {/* {user.fullName} */}
              </CardTitle>
              <CardSubtitle className="forSubtitle" tag="h6">
                Username:
                {/* {user.phoneNumber} */}
              </CardSubtitle>
            </CardBody>
            <div className="forReset">
              <Button
                id="resetPassword"
                onClick={() => history.push("/resetpassword")}
              >
                Reset Password
              </Button>
            </div>
          </Card>
        </div>
      </CardGroup>
    </>
  );
}

export default Profile;
