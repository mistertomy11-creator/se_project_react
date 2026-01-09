import "./ItemCard.css";

function ItemCard({ data, onCardClick, onCardLike, currentUser, isLoggedIn }) {
  function handleOpenCard() {
    onCardClick(data);
  }

  function handleLikeClick(e) {
    e.stopPropagation(); // prevents triggering card open if you click the like area
    onCardLike(data);
  }

  const userId = currentUser?._id;

  // supports likes as array of strings OR populated objects
  const isLiked = Boolean(
    isLoggedIn &&
      userId &&
      data.likes?.some((id) =>
        typeof id === "string" ? id === userId : id?._id === userId
      )
  );

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{data.name}</h2>

        {isLoggedIn && (
          <div className="card__likes">
            <button
              type="button"
              className={`card__like-button ${
                isLiked ? "card__like-button_active" : ""
              }`}
              onClick={handleLikeClick}
              aria-label={isLiked ? "Unlike item" : "Like item"}
            />
            <span className="card__like-count">{data.likes?.length ?? 0}</span>
          </div>
        )}
      </div>

      <img
        src={data.imageUrl}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />
    </li>
  );
}

export default ItemCard;
