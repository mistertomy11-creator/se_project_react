import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { weatherConditionImages } from "../../utils/constants";

import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  // TODO - destructure the currentTempUnit (done)
  const contextValue = useContext(CurrentTemperatureUnitContext);

  // TODO - set up the alt text (done)
  // TODO - vary image based on day/night (hint tenary operator) (done)
  return (
    <section className="weather-card">
      <img
        alt="condition weather"
        className="weather-card__image"
        src={
          weatherConditionImages[weatherData.isDay ? "day" : "night"][
            weatherData.weatherCondition
          ]?.image ||
          weatherConditionImages[weatherData.isDay ? "day" : "night"]["default"]
            ?.image
        }
      />
      <p className="weather-card__temp">
        {weatherData.temp[contextValue.currentTempUnit]}&deg;{" "}
        {contextValue.currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
