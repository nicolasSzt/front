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

export const getAllMemberInformation = async (workspace_id) => {
  try {
    const response = await kyClient().get(`members/${workspace_id}`).json();
    return {
      members: response.data, // Envolvemos en 'members'
    };
  } catch (error) {
    console.error("Error fetching member info:", error);
    throw error;
  }
};
