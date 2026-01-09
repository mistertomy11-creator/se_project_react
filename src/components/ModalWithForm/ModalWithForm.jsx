import closeModal from "../../assets/closeModal.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  children,
  handleSubmit,
  title,
  name,
  isDisabled,
  onRegisterClick, // used for the Sign Up button
  onLoginClick,
}) {
  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>

        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeModal} alt="Close" />
        </button>

        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}

          {/* PRIMARY BUTTON — Log In or Sign Up */}
          <button
            type="submit"
            className={`modal__submit ${
              !isDisabled ? "modal__submit_enabled" : ""
            }`}
            disabled={isDisabled}
          >
            {title === "Sign in" ? "Log In" : "Sign Up"}
          </button>

          {/* SECONDARY BUTTON — Only on Login modal */}
          {title === "Sign in" ? (
            <button
              type="button"
              className="modal__secondary-btn"
              onClick={onRegisterClick}
            >
              or Sign Up
            </button>
          ) : (
            <button
              type="button"
              className="modal__secondary-btn"
              onClick={onLoginClick}
            >
              or Log In
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
