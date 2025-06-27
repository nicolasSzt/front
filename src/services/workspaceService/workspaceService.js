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
    console.log("Fetching channels for workspace:", workspaceId);

    const response = await kyClient().get(`channels/${workspaceId}`).json();
    console.log("Fetched channels:", response.data.channels);

    return response.data.channels;
  } catch (error) {
    console.error("Error fetching channels", error);
    throw error;
  }
};

export const createWorkspace = async (workspace) => {
  const { title, description } = workspace;
  try {
    const data = await kyClient
      .post("workspaces", {
        json: {
          name: title,
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
