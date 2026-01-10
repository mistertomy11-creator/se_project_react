import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, avatar });
  }

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="edit-profile-modal__title">Change profile data</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <fieldset className="modal__fieldset">
            <label className="modal__label">
              Name *
              <input
                className="modal__input"
                type="text"
                value={name}
                minLength="2"
                maxLength="30"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="modal__label">
              Avatar *
              <input
                className="modal__input"
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                required
              />
            </label>

            <button className="modal__submit" type="submit">
              Save changes
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
