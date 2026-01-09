const coordinates = { lat: "31.9574397", lon: "-81.3214008" };
const apiKey = "673a9d4fee9bed2ddaded524099e7195";

{
  /*const BaseUrl =
  process.env.NODE_ENV === "production"*/
}
const BaseUrl = import.meta.env.PROD
  ? "https://api.wisw.jumpingcrab.com"
  : "http://localhost:3001";

// TODO- add the other werather image - Done
const weatherConditionImages = {
  day: {
    clear: {
      name: "clear",
      image: new URL("../assets/day/clear.svg", import.meta.url).href,
    },
    clouds: {
      name: "cloudy",
      image: new URL("../assets/day/cloudy.svg", import.meta.url).href,
    },
    default: {
      name: "default",
      image: new URL("../assets/day/default.svg", import.meta.url).href,
    },
    foggy: {
      name: "foggy",
      image: new URL("../assets/day/foggy.svg", import.meta.url).href,
    },
    rainy: {
      name: "rainy",
      image: new URL("../assets/day/rainy.svg", import.meta.url).href,
    },
    snowy: {
      name: "snowy",
      image: new URL("../assets/day/snowy.svg", import.meta.url).href,
    },
    stromy: {
      name: "stromy",
      image: new URL("../assets/day/stromy.svg", import.meta.url).href,
    },
  },
  night: {
    clear: {
      name: "clear",
      image: new URL("../assets/night/clear.svg", import.meta.url).href,
    },
    clouds: {
      name: "cloudy",
      image: new URL("../assets/night/cloudy.svg", import.meta.url).href,
    },
    default: {
      name: "default",
      image: new URL("../assets/night/default.svg", import.meta.url).href,
    },
    foggy: {
      name: "foggy",
      image: new URL("../assets/night/foggy.svg", import.meta.url).href,
    },
    rainy: {
      name: "rainy",
      image: new URL("../assets/night/rainy.svg", import.meta.url).href,
    },
    snowy: {
      name: "snowy",
      image: new URL("../assets/night/snowy.svg", import.meta.url).href,
    },
    stromy: {
      name: "stromy",
      image: new URL("../assets/night/stromy.svg", import.meta.url).href,
    },
  },
};

export { coordinates, apiKey, weatherConditionImages, BaseUrl };
