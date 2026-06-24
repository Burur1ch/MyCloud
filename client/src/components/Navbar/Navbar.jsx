import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/img/navbar-logo.png";
import Avatar from "../../assets/img/Avatar.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  function searchChangeHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) clearTimeout(searchTimeout);
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar__brand">
          <img src={Logo} alt="" className="navbar__logo" />
          <span className="navbar__title">MY CLOUD</span>
        </NavLink>
        {isAuth && (
          <div className="navbar__search-wrap">
            <SearchIcon />
            <input
              value={searchName}
              onChange={searchChangeHandler}
              className="navbar__search"
              type="text"
              placeholder="Search files..."
            />
          </div>
        )}

        {!isAuth && (
          <div className="navbar__actions">
            <NavLink to="/login" className="navbar__btn navbar__btn--ghost">
              Log in
            </NavLink>
            <NavLink
              to="/registration"
              className="navbar__btn navbar__btn--primary"
            >
              Sign up
            </NavLink>
          </div>
        )}

        {isAuth && (
          <div className="navbar__actions">
            <button
              className="navbar__btn navbar__btn--logout"
              onClick={() => dispatch(logout())}
            >
              <LogoutIcon />
              Sign out
            </button>
            <NavLink to="/profile">
              <img className="navbar__avatar" src={Avatar} alt="profile" />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
