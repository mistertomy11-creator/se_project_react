import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <aside className="sideBar">
      <div className="sideBar__row">
        <p className="sideBar__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne's avatar"
          className="SideBar__avatar"
        />
      </div>
    </aside>
  );
}

export default SideBar;
