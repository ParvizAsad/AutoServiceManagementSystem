import React, { useState } from "react";
import { Navbar } from "reactstrap";
import "./Header.scss";
import { AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";
import { userService } from "../../../Api/services/Users";
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

        <div  className="forHome">
      <Link className="linkForHome" to="/">
        <AiOutlineHome/>
      </Link>
        </div>
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
