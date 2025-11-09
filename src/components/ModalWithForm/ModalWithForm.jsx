import { Children } from "react";
import closeForm from "../../assets/closeForm.svg";

function ModalWithForm({
  isOpen,
  onClose,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
}) {
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        {/* TODO - use the icon; use the modifier to change the image icon*/}
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
          aria-label="Close"
        >
          {" "}
          <img
            src={closeForm}
            alt="Close"
            className="modal__close-btn modal__close-btn_type_form"
          />
        </button>
        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}
        </form>
        <button type="submit" className="modal__submit-btn">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
