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

export const getAllMessagesByChannel = async (workspaceId, channelId) => {
  const response = await kyClient()
    .get(`messages/${workspaceId}/${channelId}`)
    .json();
  return response.data;
};

export const createMessage = async (content, workspaceId, channelId) => {
  const response = await kyClient()
    .post(`messages/${workspaceId}/${channelId}`, {
      json: { content },
    })
    .json();
  return response;
};
