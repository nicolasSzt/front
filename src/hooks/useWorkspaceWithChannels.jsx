import { getAllChannelsByWorkspace, getAllWorkspaces } from "@/services/workspaceService";
import { useQuery, useQueries } from "@tanstack/react-query";

export const useWorkspacesWithChannels = () => {
  const {
    data: workspacesData,
    isLoading: loadingWorkspaces,
    isError: errorWorkspaces,
    error: errorWorkspaceMessage,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    refetchOnWindowFocus: false,
  });

  const workspaces = workspacesData ?? [];
  const workspaceIds = workspaces.map((w) => w._id);

  const channelsQueries = useQueries({
    queries: workspaceIds.map((workspaceId) => ({
      queryKey: ["channels", workspaceId],
      queryFn: () => getAllChannelsByWorkspace(workspaceId),
      refetchOnWindowFocus: false,
    })),
  });

  const loadingChannels = channelsQueries.some((q) => q.isLoading);
  const errorChannels = channelsQueries.some((q) => q.isError);
  const channelsError = channelsQueries.find((q) => q.isError)?.error;

  const workspacesWithChannels = [];

  for (let i = 0; i < workspaces.length; i++) {
    const workspace = workspaces[i];
    const channelsQuery = channelsQueries[i];

    let channelsCount = 0;
    if (channelsQuery && channelsQuery.data) {
      channelsCount = channelsQuery.data.length;
    }

    workspacesWithChannels.push({
      ...workspace,
      channelsCount,
    });
  }

  const isLoading = loadingWorkspaces || loadingChannels;
  const isError = errorWorkspaces || errorChannels;
  const error = errorWorkspaceMessage || channelsError;

  return {
    workspaces: workspacesWithChannels,
    isLoading,
    isError,
    error,
  };
};

export default useWorkspacesWithChannels;