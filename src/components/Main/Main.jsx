import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  clothingItems,
  handleOpenItemModal,
  weatherData,
  onCardLike,
  currentUser,
  isLoggedIn,
}) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  function getWeatherType(tempF) {
    if (tempF >= 75) return "hot";
    if (tempF >= 60) return "warm";
    return "cold";
  }

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temp[currentTempUnit]}° {currentTempUnit} / You
        may want to wear:
      </p>
      <ul className="main__card-list">
        {clothingItems
          .filter((item) => item.weather === getWeatherType(weatherData.temp.F))
          .map((item) => (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
              onCardLike={onCardLike}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
