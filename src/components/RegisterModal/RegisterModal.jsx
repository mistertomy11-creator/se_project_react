import { useCallback } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const customValidators = useCallback(() => {
    return {
      email: (value) => {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Minimum 6 characters required";
        return "";
      },
      name: (value) => {
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      },
      avatar: (value) => {
        try {
          new URL(value);
          return "";
        } catch {
          return "Please enter a valid URL";
        }
      },
    };
  }, [])();

  const { values, handleChange, errors, validateForm, resetForm } =
    useFormWithValidation(
      {
        email: "",
        password: "",
        name: "",
        avatar: "",
      },
      customValidators
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm(event.target)) return;

    onRegister(values);
    resetForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      name="register-form"
      handleSubmit={handleSubmit}
      isDisabled={!values.email || !values.password || !values.name}
      onLoginClick={onLoginClick}
      buttonText="Sign Up" /* ✅ ADD */
      showAuthSwitch={true} /* ✅ ADD */
    >
      <label
        className={`modal__label ${errors.name && "modal__label_invalid"}`}
      >
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

      <label
        className={`modal__label ${errors.password && "modal__label_invalid"}`}
      >
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

      <label
        className={`modal__label ${errors.name && "modal__label_invalid"}`}
      >
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label
        className={`modal__label ${errors.avatar && "modal__label_invalid"}`}
      >
        Avatar URL
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
