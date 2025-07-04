import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  getAllWorkspaces,
  getAllChannelsByWorkspace,
  createWorkspace,
} from "@/services/workspaceService";

const useWorkspaceSelector = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: workspacesData = [],
    isLoading: loadingWorkspaces,
    isError: errorWorkspaces,
    error: errorWorkspaceMessage,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    refetchOnWindowFocus: false,
  });

  const validWorkspaces = workspacesData.filter((w) => !!w._id);

  const channelsQueries = useQueries({
    queries: validWorkspaces.map((workspace) => ({
      queryKey: ["channels", workspace._id],
      queryFn: () => getAllChannelsByWorkspace(workspace._id),
      enabled: !!workspace._id,
      refetchOnWindowFocus: false,
    })),
  });

  const workspaces = validWorkspaces.map((workspace, i) => {
    const channels = channelsQueries[i]?.data ?? [];
    return {
      ...workspace,
      channelsCount: channels.length,
    };
  });

  const isLoading = loadingWorkspaces || channelsQueries.some((q) => q.isLoading);
  const isError = errorWorkspaces || channelsQueries.some((q) => q.isError);
  const error = errorWorkspaceMessage || channelsQueries.find((q) => q.isError)?.error;

  const handleWorkspaceSelect = useCallback(
    (workspaceId) => {
      setSelectedWorkspace(workspaceId);
      navigate(`/workspaceDetail/${workspaceId}`);
    },
    [navigate]
  );

  const handleCreateWorkspace = useCallback(
    async (title, description) => {
      const newWorkspace = await createWorkspace(title, description);

      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      setSelectedWorkspace(newWorkspace._id);

      return newWorkspace;
    },
    [queryClient]
  );

  return {
    workspaces,
    isLoading,
    isError,
    error,
    selectedWorkspace,
    handleWorkspaceSelect,
    handleCreateWorkspace,
  };
};

export default useWorkspaceSelector;
