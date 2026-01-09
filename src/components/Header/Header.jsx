import { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleOpenAddGarmentModal,
  weatherData,
  isLoggedIn,
  onLogin,
  onRegister,
}) {
  const currentUser = useContext(CurrentUserContext);

  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    }

    // Placeholder with first letter of the name
    return (
      <div className="header__avatar-placeholder">
        {currentUser?.name?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <header className="header">
      <div className="header__side">
        <Link className="header__link" to="/profile">
          <img src={logo} alt="WTWR logo" className="header__logo" />
          <p className="header__place">
            <time className="header__datetime" dateTime={now}>
              {dateStr}
            </time>
            , {weatherData.city}
          </p>
        </Link>
      </div>

      <div className="header__side">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleOpenAddGarmentModal}
              className="header__add-clothes-btn"
            >
              + add clothes
            </button>

            <Link className="header__link" to="/">
              <p className="header__username">{currentUser?.name}</p>
              {renderAvatar()}
            </Link>
          </>
        ) : (
          <nav className="header__auth">
            <button className="header__link" onClick={onRegister}>
              Sign Up
            </button>
            <button className="header__link" onClick={onLogin}>
              Log in
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
