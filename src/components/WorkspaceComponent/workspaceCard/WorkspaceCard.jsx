import { CardContent, StyledCard } from "@/components/styled/Card"
import { CardHeader, FlexColumn, FlexRow } from "@/components/styled/Layaout"
import WorkspaceAvatar from "../workspaceAvatar/WorkspaceAvatar"
import { WorkspaceDescription, WorkspaceTitle } from "@/components/styled/Typography"
import { StatusBadge } from "@/components/styled/Badge"
import { WORKSPACE_SELECTOR_TEXTS } from "@/constans/workspaces/workspaces"
import WorkspaceStats from "../worskpaceStats/WorkspaceStats"

const WorkspaceCard = ({ workspace, isSelected, onSelect }) => {
  const {
    id,
    title,
    description,
    members,
    channels,
    isActive
  } = workspace

  const handleClick = () => onSelect(id)

  return (
    <StyledCard
      isSelected={isSelected}
      onClick={handleClick}
    >
      <CardContent>
        <CardHeader>
          <FlexRow>
            <WorkspaceAvatar workspace={workspace} />
            <FlexColumn>
              <FlexRow gap="8px">
                <WorkspaceTitle>{title}</WorkspaceTitle>
                {isActive && <StatusBadge>{WORKSPACE_SELECTOR_TEXTS.activeLabel}</StatusBadge>}
              </FlexRow>
              <WorkspaceDescription>{description}</WorkspaceDescription>
            </FlexColumn>
          </FlexRow>
          <div style={{ color: "#718096", fontSize: "20px" }}>→</div>
        </CardHeader>

        <WorkspaceStats
          members={members}
          channels={channels}
          membersLabel={WORKSPACE_SELECTOR_TEXTS.membersLabel}
          channelsLabel={WORKSPACE_SELECTOR_TEXTS.channelsLabel}
        />
      </CardContent>
    </StyledCard>
  )
}

export default WorkspaceCard
