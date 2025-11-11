import "./ItemModal.css";

import closeModal from "../../assets/closeModal.svg";

function ItemModal({ card, isOpen, onClose }) {
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container">
        {/* Close 
        button */}
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeModal} alt="Close" className="modal__close-btn" />
        </button>

        {/* Image */}
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__text">{card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
