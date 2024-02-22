import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import OpenModalMenuItem from "./OpenModalMenuItem";
import bytebitesLogo from "../../byte-bites-high-resolution-logo-transparent.png"
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user)
  return (
    <div className="navbar-container">
      <NavLink to='/' className="navbar-logo-container">
        <img src={bytebitesLogo} className="navbar-logo" />
      </NavLink>

      <div className="navbar-link-container">
        <NavLink to="/" className="navbar-link">Home</NavLink>
        <NavLink to="/restaurants" className="navbar-link">Restaurants</NavLink>


      {user ?
        (
          <div className="profile-cart">
             {/* <NavLink to="/manage" className="navbar-link">My Restaurants</NavLink> */}
             <NavLink to="/cart" className={'cart-icon'}><i class="fa-solid fa-cart-shopping"></i></NavLink>
            <ProfileButton />

          </div>
        )
        :
        (
          <>
            <NavLink to="/signup" className="navbar-link">Sign Up</NavLink>
            <div className="navbar-link">
              <OpenModalMenuItem  itemText="Log In" className="navbar-link"
                  modalComponent={<LoginFormModal />}
                />
            </div>
          </>
        )
      }
      </div>
    </div>
  );
}

export default Navigation;
