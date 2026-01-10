import { useCallback } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onClose, handleAddItemSubmit }) {
  // Memoize custom validators so they don't get recreated on every render
  const customValidators = useCallback(() => {
    return {
      name: (value) => {
        if (!value || value.trim() === "") return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      },
      imageUrl: (value) => {
        if (!value || value.trim() === "") return "Image URL is required";
        // Simple URL validation
        try {
          new URL(value);
          return "";
        } catch {
          return "Please enter a valid URL";
        }
      },
    };
  }, [])();

  const { values, handleChange, resetForm, errors, isValid, validateForm } =
    useFormWithValidation(
      {
        name: "",
        weather: "hot",
        imageUrl: "",
      },
      customValidators
    );

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form on submit and get the form element
    const formElement = event.target.closest("form");
    const isFormValid = validateForm(formElement);

    // Don't submit if form is invalid
    if (!isFormValid) return;

    handleAddItemSubmit(values);
    // reset values and errors after successful submission
    resetForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <fieldset className="modal__fieldset">
        <label
          htmlFor="add-garment-name-input"
          className={`modal__label ${
            errors.name ? "modal__label_invalid" : ""
          }`}
        >
          Name
          <input
            id="add-garment-name-input"
            type="text"
            className={`modal__input ${
              errors.name ? "modal__input_invalid" : ""
            }`}
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <span className="modal__error">{errors.name}</span>}
        </label>
        <label
          htmlFor="add-garment-link-input"
          className={`modal__label ${
            errors.imageUrl ? "modal__label_invalid" : ""
          }`}
        >
          Image
          <input
            id="add-garment-link-input"
            type="text"
            className={`modal__input ${
              errors.imageUrl ? "modal__input_invalid" : ""
            }`}
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <span className="modal__error">{errors.imageUrl}</span>
          )}
        </label>
      </fieldset>
      <fieldset className="modal__fieldset">
        <legend>Select the weather type:</legend>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="hot">
            Hot
          </label>
        </div>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="warm">
            Warm
          </label>
        </div>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
