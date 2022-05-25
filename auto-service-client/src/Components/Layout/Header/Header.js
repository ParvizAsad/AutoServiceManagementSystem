import React, { useState } from "react";
import { Navbar } from "reactstrap";
import "./Header.scss";
import logo from "../../../Assets/Images/Logo/logo.webp";
import Icon from "../../../Assets/Images/Icon/profile-icon.jpg";
import { Link } from "react-router-dom";
import { userService } from "../../../Api/services/Users";
import { bioService } from "../../../Api/services/Bios";
import { accountService } from "../../../Api/services/Account";

function Header() {
  const [user, setUser] = useState();

  React.useEffect(() => {
    userService.getUserById().then(({ data }) => {
      setUser(data);
    });
  }, []);

  // {bioServicegetBio}
  return (
    <div className="forHeading">
      <Navbar id="NavbarId">
        <img src={logo} alt="Logo" />
        <h1>Car-Tool-Network Auto Service</h1>
        <div className="Profile">
          <div>
            <div className="ForAccount">
              {/* user.IsAuthenticated==true */}
              {false ? (
                <h4>
                  <Link
                    className="linkForAccount"
                    onClick={accountService.logout()}
                  >
                    Logout
                  </Link>
                </h4>
              ) : (
                <h4>
                  <Link className="linkForAccount" to="login">
                    <h1 className="forLogin">Login</h1>
                  </Link>
                </h4>
              )}
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
