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
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
        handleCardLike={handleCardLike}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </main>
  );
}

export default Profile;
