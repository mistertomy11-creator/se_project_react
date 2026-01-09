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

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal__title">Change profile</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
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
            Avatar URL
            <input
              className="modal__input"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>

          <button className="modal__submit" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
