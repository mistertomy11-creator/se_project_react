import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as auth from "../../utils/auth";

import EditProfileModal from "../EditProfileModal/EditProfileModal";
import {
  addItem,
  getItems,
  deleteItem,
  changeLikeStatus,
  updateProfile,
} from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { getWeatherData } from "../../utils/weatherApi";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openRegisterModal = () => setActiveModal("register-modal");
  const openLoginModal = () => setActiveModal("login-modal");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile-modal");
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  // toggle temperature unit using the stable state setter
  function handleTempUnitChange() {
    setCurrentTempUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  //
  function handleAddItemSubmit(inputValues) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    addItem(inputValues, token)
      .then((res) => {
        const newItem = res.data ?? res;
        setClothingItems((prev) => [newItem, ...prev]);
        setActiveModal("");
      })
      .catch(console.error);
  }

  function handleUpdateProfile({ name, avatar }) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    updateProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch(console.error);
  }

  function handleDeleteRequest(item) {
    setItemToDelete(item); // remember which item to delete
    setActiveModal(""); //  close ItemModal
    setIsConfirmOpen(true); //  open ConfirmDeleteModal
  }

  function handleRegister({ name, avatar, email, password }) {
    auth
      .signup({ name, avatar, email, password })
      .then(() =>
        // After successful registration, log the user in
        auth.signin({ email, password })
      )
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeAllModals();
        }
      })
      .catch(console.error);
  }

  function handleLogin({ email, password }) {
    auth
      .signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeAllModals();
        }
      })
      .catch(console.error);
  }

  function handleCardLike(item) {
    if (!isLoggedIn || !currentUser?._id) return;

    const userId = currentUser._id;

    const isLiked = item.likes?.some((id) =>
      typeof id === "string" ? id === userId : id?._id === userId
    );

    changeLikeStatus(item._id, isLiked)
      .then((res) => {
        const updatedItem = res.data ?? res;
        setClothingItems((state) =>
          state.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      })
      .catch(console.error);
  }

  function closeAllModals() {
    setActiveModal("");
    setIsConfirmOpen(false);
  }

  // Sign Out
  function handleSignOut() {
    localStorage.removeItem("jwt"); // Remove token
    setIsLoggedIn(false); // Update auth state
    setCurrentUser(null); // Clear current user context
  }

  // Weather
  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  // Items // The App component saves the clothing items in state
  useEffect(() => {
    getItems()
      .then((items) => {
        // New items appear first
        const sortedItems = [...items].reverse();
        setClothingItems(sortedItems);
      })
      .catch(console.error);
  }, []);

  // auth token check
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData); // safe even if unused for now
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, setCurrentTempUnit, handleTempUnitChange }}
      >
        <div className="app">
          <Header
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onLogin={() => setActiveModal("login-modal")}
            onRegister={() => setActiveModal("register-modal")}
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
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                    handleOpenItemModal={handleOpenItemModal}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    onSignOut={handleSignOut} // Pass the handler
                    onEditProfile={handleOpenEditProfileModal}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>

          <Footer />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            onClose={closeAllModals}
            // onClose={() => setActiveModal(false)}
            onDelete={handleDeleteRequest} //I placed this line as a test
          />

          <AddItemModal
            isOpen={activeModal === "add-garment-modal"}
            onClose={closeAllModals}
            //onClose={() => setActiveModal(false)}
            handleAddItemSubmit={handleAddItemSubmit}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile-modal"}
            onClose={closeAllModals}
            onSubmit={handleUpdateProfile}
          />

          <RegisterModal
            isOpen={activeModal === "register-modal"}
            onClose={closeAllModals}
            onLoginClick={openLoginModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={closeAllModals}
            onRegisterClick={openRegisterModal}
            handleLogin={handleLogin}
            /* onRegisterClick={() => {
              closeAllModals();
              setActiveModal("register-modal");
            }}*/
          />

          <ConfirmDeleteModal
            isOpen={isConfirmOpen}
            onClose={closeAllModals}
            //onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => {
              if (itemToDelete) {
                const token = localStorage.getItem("jwt");
                if (!token) return;

                deleteItem(itemToDelete._id, token)
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
    </CurrentUserContext.Provider>
  );
}

export default App;
