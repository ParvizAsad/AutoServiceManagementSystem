import {
Button
} from "reactstrap";
import { useHistory } from "react-router-dom";
import React, { useCallback, useState } from "react";

import {
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavbarText
} from "reactstrap";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
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