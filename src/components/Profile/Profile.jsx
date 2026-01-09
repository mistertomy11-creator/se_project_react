import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  handleCardLike,
  isLoggedIn,
  currentUser,
  onSignOut,
  onEditProfile,
}) {
  return (
    <>
      <button className="profile__signout-btn" onClick={onSignOut}>
        Sign Out
      </button>

      <main className="profile">
        <SideBar onEditProfile={onEditProfile} />
        <ClothesSection
          clothingItems={clothingItems}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          handleOpenItemModal={handleOpenItemModal}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
      </main>
    </>
  );
}

export default Profile;
