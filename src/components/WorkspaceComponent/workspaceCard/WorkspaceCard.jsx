import { CardContent, StyledCard } from "@/components/styled/Card";
import { CardHeader, FlexColumn, FlexRow } from "@/components/styled/Layaout";
import { WorkspaceDescription, WorkspaceTitle } from "@/components/styled/Typography";
import { StatusBadge } from "@/components/styled/Badge";
import WorkspaceStats from "../worskpaceStats/WorkspaceStats";
import { WORKSPACE_SELECTOR_TEXTS } from "@/constans/workspaces/workspaces";

const WorkspaceCard = ({
  workspace,
  membersCount,
  isSelected,
  onSelect,
  channelsCount,
}) => {
  const {
    _id,
    title,
    description,
    isActive,
  } = workspace;
  const handleClick = () => onSelect(_id);
  return (
    <StyledCard isSelected={isSelected} onClick={handleClick}>
      <CardContent>
        <CardHeader>
          <FlexRow>
            <FlexColumn>
              <FlexRow gap="8px">
                <WorkspaceTitle>{title}</WorkspaceTitle>
                {isActive && (
                  <StatusBadge>{WORKSPACE_SELECTOR_TEXTS.activeLabel}</StatusBadge>
                )}
              </FlexRow>
              <WorkspaceDescription>{description}</WorkspaceDescription>
            </FlexColumn>
          </FlexRow>
          <div style={{ color: "#718096", fontSize: "20px" }}>→</div>
        </CardHeader>

        <WorkspaceStats
          membersCount={membersCount}
          channels={channelsCount}
          membersLabel={WORKSPACE_SELECTOR_TEXTS.membersLabel}
          channelsLabel={WORKSPACE_SELECTOR_TEXTS.channelsLabel}
        />
      </CardContent>
    </StyledCard>
  );
};

export default WorkspaceCard;
