import { useCallback } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, handleLogin, onRegisterClick }) {
  const customValidators = useCallback(() => {
    return {
      email: () => "",
      password: () => "",
    };
  }, [])();

  const { values, errors, handleChange, validateForm, resetForm } =
    useFormWithValidation(
      {
        email: "",
        password: "",
      },
      customValidators
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(e.target)) return;

    handleLogin(values);
    resetForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      name="login-form"
      handleSubmit={handleSubmit}
      isDisabled={!values.email || !values.password}
      onRegisterClick={onRegisterClick}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
