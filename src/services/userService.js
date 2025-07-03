import ENVIRONMENT from "@/constans/environment";
import LOCALSTORAGE_KEYS from "@/constans/localStorage";
import ky from "ky";

const kyClient = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN);
  return ky.create({
    prefixUrl: `${ENVIRONMENT.URL_API}/api/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUserInformation = async () => {
  try {
    const response = await kyClient().get(`users`).json();
    return { users: response.data.users }; // envolver en objeto con 'users'
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
