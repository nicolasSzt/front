import { Typography } from '@mui/material';
import { StatItem, StatsContainer } from '@/components/styled/Layaout';


const StatItemComponent = ({ icon, value, label }) => (
  <StatItem>
    <Typography fontSize={20}>
      {icon}
    </Typography>
    <Typography fontWeight={500}>
      {value} {label}
    </Typography>
  </StatItem>
);

const WorkspaceStats = ({ members, channels, membersLabel, channelsLabel }) => {
  return (
    <StatsContainer>
      <StatItemComponent icon="👥" value={members} label={membersLabel} />
      <StatItemComponent icon="💬" value={channels} label={channelsLabel} />
    </StatsContainer>
  );
};

export default WorkspaceStats;
