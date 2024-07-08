import { api } from "./api";

export const GetMaps = async (origin, destination) => {
  debugger;
  try {
    return await api.get(
      `json?destination=${destination}, Uberlandia-mg&origin=${origin}, Uberlandia-mg&key=AIzaSyCjEcdO5wZV5RCWtPbRFYgWeTGs_sDB4ZQ`
    );
  } catch (error) {
    return error;
  }
};
