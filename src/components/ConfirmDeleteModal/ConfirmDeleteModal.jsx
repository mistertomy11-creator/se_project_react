import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__content confirm-modal__content">
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        <p className="confirm-modal__text">
          Are you sure you want to delete this item?
          <br />
          <span>This action is irreversible.</span>
        </p>

        <button className="confirm-modal__delete" onClick={onConfirm}>
          Yes, delete item
        </button>

        <button className="confirm-modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
