import axios from "axios";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const linkApi = {
  link: proxyUrl + "https://maps.googleapis.com/maps/api/directions",
};

const api = axios.create({
  baseURL: linkApi.link,
});

export { linkApi, api };
