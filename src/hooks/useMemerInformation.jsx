import { useQueries } from "@tanstack/react-query";
import useWorkspacesWithChannels from "./useWorkspaceWithChannels";
import { getAllMemberInformation } from "@/services/memberService";

const useMemberInformation = () => {
  const { workspaces, isLoading: isWorkspacesLoading } = useWorkspacesWithChannels();

  const membersQueries = useQueries({
    queries: workspaces.map((workspace) => ({
      queryKey: ["members", workspace._id],
      queryFn: async () => {
        const { members } = await getAllMemberInformation(workspace._id);
        return members;
      },
      enabled: !!workspace._id,
      refetchOnWindowFocus: false,
    })),
  });

  const membersByWorkspace = membersQueries.map((query, index) => {
    const workspaceId = workspaces?.[index]?._id;

    return {
      workspaceId,
      members: query.data || [],
      membersCount: (query.data || []).length, 
      isLoading: query.isLoading,
      isError: query.isError,
    };
  });

  return {
    membersByWorkspace,
    isLoading: isWorkspacesLoading || membersQueries.some((q) => q.isLoading),
  };
};

export default useMemberInformation;
