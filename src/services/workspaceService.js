import { WorkspaceTitle } from "@/components/styled/Typography";
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

export const getAllWorkspaces = async () => {
  try {
    const response = await kyClient().get("workspaces").json();
    const workspaces = response.data.workspacesMember.map(
      (item) => item.workspace
    );
    return workspaces;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllChannelsByWorkspace = async (workspaceId) => {
  try {
    const response = await kyClient().get(`channels/${workspaceId}`).json();
    return response.data.channels;
  } catch (error) {
    throw error;
  }
};

export const createWorkspace = async (title, description) => {
  try {
    const data = await kyClient()
      .post("workspaces", {
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
