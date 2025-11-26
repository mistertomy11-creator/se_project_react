import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
// I place this import
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

import { addItem, getItems, deleteItem } from "../../utils/api";

import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  // I placed these two lines of code as a test
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleTempUnitChange() {
    if (currentTempUnit == "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  function handleAddItemSubmit(inputValues) {
    addItem(inputValues)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        // TODO - Close the modal (Done)
        setActiveModal("");
      })
      .catch(console.error);
  }

  // I placed these three lines of code as a test
  function handleDeleteRequest(item) {
    setItemToDelete(item); // remember which item to delete
    setActiveModal(""); //  close ItemModal
    setIsConfirmOpen(true); //  open ConfirmDeleteModal
  }

  // TODO - Pass as a prop (I made some changes as a test)
  // I changed item to itemDelete and i add setIsConfirm
  /*function handleDeleteItem(itemToDelete) {
    deleteItem(itemToDelete._id)
      .then(() => {
        // filter out the deleted item by its ID
        setClothingItems((prevItems) =>
          prevItems.filter(
            (clothingItem) => clothingItem._id !== itemToDelete._id
          )
        );
        setIsConfirmOpen(true);
        // TODO - Close the modal (Done)
        setActiveModal("");
        // Close confirm modal
        setItemToDelete(card);
      })
      .catch(console.error);
  } */

  // i placerd this as test
  function handleDeleteItem(card) {
    setItemToDelete(card); // remember which card to delete
    setActiveModal(""); // 👈 close the big ItemModal
    setIsConfirmOpen(true); // 👈 open the confirm popup
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        // TODO - make the new items appear first
        const sortedItems = [...items].reverse();
        setClothingItems(sortedItems);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
        </Routes>
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={() => setActiveModal(false)}
          // handleDeleteItem={handleDeleteItem}
          onDelete={handleDeleteRequest} //I placed this line as a test
        />
        <AddItemModal
          isOpen={activeModal === "add-garment-modal"}
          onClose={() => setActiveModal(false)}
          handleAddItemSubmit={handleAddItemSubmit}
        />
        {/*I placed this line as a test
        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={""}
        />*/}

        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            if (itemToDelete) {
              deleteItem(itemToDelete._id)
                .then(() => {
                  setClothingItems((prevItems) =>
                    prevItems.filter(
                      (clothingItem) => clothingItem._id !== itemToDelete._id
                    )
                  );
                  setItemToDelete(null); // clear selection
                  setIsConfirmOpen(false); // close modal
                })
                .catch(console.error);
            }
          }}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
