import axios from "axios";


const linkApi = {
  link: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions",
};

const api = axios.create({
  baseURL: linkApi.link,
});

export { linkApi, api };
