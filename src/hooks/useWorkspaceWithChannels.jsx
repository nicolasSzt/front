import { useState, useCallback } from "react";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getAllWorkspaces,
  getAllChannelsByWorkspace,
  createWorkspace,
} from "@/services/workspaceService";

const useWorkspaceManager = () => {
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

  // Filtrar null o workspace sin _id
  const validWorkspaces = workspacesData.filter((w) => w && w._id);

  const workspaceIds = validWorkspaces.map((w) => w._id);

  const channelsQueries = useQueries({
    queries: workspaceIds.map((id) => ({
      queryKey: ["channels", id],
      queryFn: () => getAllChannelsByWorkspace(id),
      refetchOnWindowFocus: false,
    })),
  });

  const workspaces = validWorkspaces.map((workspace, i) => {
    const channelsCount = channelsQueries[i]?.data?.length || 0;
    return { ...workspace, channelsCount };
  });

  const isLoading =
    loadingWorkspaces || channelsQueries.some((q) => q.isLoading);
  const isError = errorWorkspaces || channelsQueries.some((q) => q.isError);
  const error = errorWorkspaceMessage || channelsQueries.find((q) => q.isError)?.error;

  const handleWorkspaceSelect = useCallback(
    (id) => {
      setSelectedWorkspace(id);
      navigate(`/workspaceDetail/${id}`);
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

export default useWorkspaceManager;
