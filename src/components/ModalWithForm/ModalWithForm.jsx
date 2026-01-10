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

  // NEW: controls the main submit button label for any form modal
  buttonText,

  // Auth-only optional props
  onRegisterClick,
  onLoginClick,

  //  NEW: Only show the "or Sign Up / or Log In" buttons when true
  showAuthSwitch = false,
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

          {/* PRIMARY BUTTON — Uses buttonText if provided */}
          <button
            type="submit"
            className={`modal__submit ${
              !isDisabled ? "modal__submit_enabled" : ""
            }`}
            disabled={isDisabled}
          >
            {buttonText || "Submit"}
          </button>

          {/*  Auth switch buttons — only show on auth modals */}
          {showAuthSwitch && title === "Sign in" && (
            <button
              type="button"
              className="modal__secondary-btn"
              onClick={onRegisterClick}
            >
              or Sign Up
            </button>
          )}

          {showAuthSwitch && title !== "Sign in" && (
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
