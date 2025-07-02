import { useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllChannelsByWorkspace } from "@/services/workspaceService";

export const useWorkspaceChannels = (workspace_id) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedChannel = searchParams.get("channel") || null;

  const { data: channels = [], isLoading, isError, error } = useQuery({
    queryKey: ["channels", workspace_id],
    queryFn: () => getAllChannelsByWorkspace(workspace_id),
    enabled: !!workspace_id,
    refetchOnWindowFocus: false,
  });

  const handleChannelSelect = (channelId) => {
    setSearchParams({ channel: channelId });
  };

  return {
    channels,
    selectedChannel,
    handleChannelSelect,
    isLoading,
    isError,
    error,
  };
};

export default useWorkspaceChannels;
