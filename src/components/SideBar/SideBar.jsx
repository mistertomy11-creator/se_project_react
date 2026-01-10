import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarFallback from "../../assets/avatar.svg";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sideBar">
      <div className="sideBar__row">
        <img
          src={currentUser?.avatar || avatarFallback}
          alt={`${currentUser?.name || "User"}'s avatar`}
          className="sideBar__avatar"
        />

        <p className="sideBar__username">{currentUser?.name || "User"}</p>
      </div>

      <button
        type="button"
        className="sideBar__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>

      <button
        type="button"
        className="sideBar__signout-btn"
        onClick={onSignOut}
      >
        Log Out
      </button>
    </aside>
  );
}

export default SideBar;
