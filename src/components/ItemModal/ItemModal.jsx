import { useContext } from "react";
import "./ItemModal.css";

import closeModal from "../../assets/closeModal.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, isOpen, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) return null;

  // Check if the current user owns this item
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container">
        {/* close button */}
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeModal} alt="Close" className="modal__close-btn" />
        </button>

        {/* Image */}
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__text">{card.weather}</p>

          {/* Delete button only for owner */}
          {isOwn && (
            <button
              onClick={() => onDelete(card)}
              className="modal__delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
