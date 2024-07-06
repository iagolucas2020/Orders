import axios from "axios";

const linkApi = {
  link: "https://maps.googleapis.com/maps/api/directions",
};

const api = axios.create({
  baseURL: linkApi.link,
  credentials: true,
});

export { linkApi, api };
