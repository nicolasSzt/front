import ENVIRONMENT from "@/constans/environment";
import LOCALSTORAGE_KEYS from "@/constans/localStorage";
import ky from "ky";

const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN);

const kyClient = () => {
  return ky.create({
    prefixUrl: `${ENVIRONMENT.URL_API}/api/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const verification = async (verify_token) => {
  try {
    const response = await kyClient()
      .get(`users/verify?verify_token=${verify_token}`)
      .json();
    return response;
  } catch (err) {
    console.error("Error al consultar estado de verificación:", err);
    throw err;
  }
};
