import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, handleAddItemSubmit }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    weather: "hot",
    imageUrl: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit(values);
    resetForm();
  };

  //TODO - implement reset (DOne)
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-garment-name-input" className="modal__label">
          Name
          <input
            id="add-garment-name-input"
            type="text"
            className="modal__input"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="add-garment-link-input" className="modal__label">
          Image
          <input
            id="add-garment-link-input"
            type="url"
            className="modal__input"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
        {/* <label htmlFor="add-garment-name-input" className="modal__label">
          Image
          <input
            id="add-garment-name-input"
            type="text"
            className="modal__input"
            name="image"
            value={values.image}
            onChange={handleChange}
          /> 
        </label>*/}
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
