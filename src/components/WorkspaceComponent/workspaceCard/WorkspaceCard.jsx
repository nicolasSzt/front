import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { styled } from "@mui/material/styles"
import { People, Tag } from "@mui/icons-material"

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: selected
    ? `2px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.divider}`,
  boxShadow: selected
    ? `0 8px 25px ${theme.palette.primary.main}25`
    : theme.shadows[4],
  height: "100%",
  width: "100%",
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
  "&:active": {
    transform: "translateY(-2px)",
  },
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  "&:last-child": {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(3),
    },
  },
}))

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginTop: "auto",
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
}))

const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}))

const WorkspaceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.125rem",
    marginBottom: theme.spacing(1.5),
  },
}))

const WorkspaceDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: 1.4,
  minHeight: "2.8em",
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
  [theme.breakpoints.up("sm")]: {
    minHeight: "3.2em",
    marginBottom: theme.spacing(2),
  },
}))

const ChipContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}))

const WorkspaceCard = ({ workspace, membersCount, isSelected, onSelect }) => {
  return (
    <StyledCard selected={isSelected} onClick={() => onSelect(workspace._id)}>
      <StyledCardContent>
        <WorkspaceTitle component="h3">{workspace.title}</WorkspaceTitle>
        <WorkspaceDescription color="text.secondary">{workspace.description}</WorkspaceDescription>
        <StatsContainer>
          <StatItem>
            <People fontSize="small" />
            <Typography variant="caption">{membersCount}</Typography>
          </StatItem>
          <StatItem>
            <Tag fontSize="small" />
            <Typography variant="caption">{workspace.channelsCount}</Typography>
          </StatItem>
        </StatsContainer>
        {isSelected && (
          <ChipContainer>
            <Chip label="Seleccionado" color="primary" size="small" />
          </ChipContainer>
        )}
      </StyledCardContent>
    </StyledCard>
  )
}

export default WorkspaceCard
