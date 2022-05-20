import {
Button
} from "reactstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import {
  CardGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import { userService } from '../../../Api/services/Users';


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
<div className ='ForHeading'>
    <h1>Profile</h1>
</div>
    <CardGroup id='moduleCards'>
    <div className='DetailPage'>
      <Card>
        <CardBody>
        <CardTitle tag="h5">
            <img src=" " className=" profilePicture"/>
              Fullname:
               {/* {user.fullName} */}
              </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Username: 
            {/* {user.phoneNumber} */}
          </CardSubtitle>
          <div className="Adding">
          <Button onClick={() => history.push("/resetpassword")} >Reset Password</Button>
        </div>
        </CardBody>
      </Card>
      </div>
  </CardGroup>
</>

  )
}

export default Profile