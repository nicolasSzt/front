import { WorkspaceTitle } from "@/components/styled/Typography";
import ENVIRONMENT from "@/constans/environment";
import LOCALSTORAGE_KEYS from "@/constans/localStorage";
import ky from "ky";

const kyClient = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN);
  return ky.create({
    prefixUrl: `${ENVIRONMENT.URL_API}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createChannel = async (
  title,
  description,
  workspaceId,
) => {
  try {
    const data = await kyClient()
      .post(`channels/${workspaceId}`, {
        json: {
          title: title,
          description: description,
        },
      })
      .json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
