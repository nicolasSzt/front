import ENVIRONMENT from "@/constans/environment";
import LOCALSTORAGE_KEYS from "@/constans/localStorage";
import ky from "ky";

const kyClient = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN);
  return ky.create({
    prefixUrl: `${ENVIRONMENT.URL_API}/api`,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export const loginAuth = async ({ email, password }) => {
  try {
    const response = await kyClient()
      .post("users/login", {
        json: { email, password },
      })
      .json();

    const token = response.data.authorization_token;

    if (token) {
      localStorage.setItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN, token);
    }

    return response;
  } catch (error) {
    let message = "";

    try {
      const errorBody = await error.response.json();
      if (errorBody && errorBody.message) {
        message = errorBody.message;
      }
    } catch {}

    const err = new Error(message || error.message || "");
    err.status = error.response ? error.response.status : null;
    throw err;
  }
};

export const registerAuth = async ({ name, email, password }) => {
  try {
    const response = await kyClient()
      .post("users/register", {
        json: {
          name,
          email,
          password,
        },
      })
      .json();

    return response;
  } catch (error) {
    let message = "";

    try {
      const errorBody = await error.response.json();
      if (errorBody && errorBody.message) {
        message = errorBody.message;
      }
    } catch {}

    const err = new Error(message || error.message || "");
    err.status = error.response ? error.response.status : null;
    throw err;
  }
};
