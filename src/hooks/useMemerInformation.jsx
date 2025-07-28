import { useQueries } from "@tanstack/react-query";
import useWorkspacesWithChannels from "./useWorkspaceWithChannels";
import { getAllMemberInformation } from "@/services/memberService";

const useMemberInformation = () => {
  const { workspaces, isLoading: isWorkspacesLoading } = useWorkspacesWithChannels();

  const memberId = useQueries({
    queries: workspaces.map((workspace) => ({
      queryKey: ["members", workspace._id],
      queryFn: async () => {
        const { members } = await getAllMemberInformation(workspace._id);
        const userId = members[0]?.user_id;
        return {
          members,
          userId
        };
      },
      refetchOnWindowFocus: false,
    })),
  });

  const membersByWorkspace = memberId.map((query, index) => {
    const workspaceId = workspaces?.[index]?._id;
    const members = query.data?.members || [];

    return {
      workspaceId,
      members,
      membersCount: members.length,
      userId: query.data?.userId,
      isLoading: query.isLoading,
      isError: query.isError,
    };
  });

  return {
    membersByWorkspace,
    isLoading: isWorkspacesLoading || memberId.some((q) => q.isLoading),
  };
};

export default useMemberInformation;
