import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  handleCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter clothing items to show only those owned by the current user
  const userItems = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "string" ? item.owner : item.owner?._id;
    return ownerId === currentUser?._id;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your Items
        <button
          onClick={() => {
            handleOpenAddGarmentModal();
          }}
          className="clothes-section__btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={() => handleOpenItemModal(item)}
            onCardLike={handleCardLike}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
