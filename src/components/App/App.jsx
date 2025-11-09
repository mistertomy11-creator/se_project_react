import { useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";

// TODO - apply all styles from Figma to all components
// TODO - implement footer
// TODO - modals
function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  return (
    <div className="app">
      <Header handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
      <Main
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
      />
      <Footer />
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        onClose={() => setActiveModal(false)}
      />
      <ModalWithForm
        isOpen={activeModal === "add-garment-modal"}
        onClose={() => setActiveModal(false)}
        title="New garment"
        buttonText="Add garment"
        name="add-garment-form"
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="add-garment-name-input" className="modal__label">
            Name
            <input
              id="add-garment-name-input"
              type="text"
              placeholder="Name"
              className="modal__input"
            />
          </label>
          <label htmlFor="add-garment-name-input" className="modal__label">
            Image
            <input
              id="add-garment-name-input"
              type="text"
              placeholder="Image URL"
              className="modal__input"
            />
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
            />
            <label className="modal__label" htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
