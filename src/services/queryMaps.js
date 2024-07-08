import { api } from "./api";

export const GetMaps = async (origin, destination) => {
  try {
    return await api.get(
      `json?destination=${destination}&origin=${origin}&key=AIzaSyCjEcdO5wZV5RCWtPbRFYgWeTGs_sDB4ZQ`
    );
  } catch (error) {
    return error;
  }
};
