import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarFallback from "../../assets/avatar.svg";

function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sideBar">
      <div className="sideBar__row">
        <p className="sideBar__username">{currentUser?.name || "User"}</p>

        <img
          src={currentUser?.avatar || avatarFallback}
          alt={`${currentUser?.name || "User"}'s avatar`}
          className="SideBar__avatar"
        />
      </div>

      <button
        type="button"
        className="sideBar__edit-btn"
        onClick={onEditProfile}
      >
        Change profile
      </button>
    </aside>
  );
}

export default SideBar;
