import { Card, CardContent, Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Add } from "@mui/icons-material"

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: "transparent",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[4],
  },
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}))

const StyledCardContent = styled(CardContent)({
  width: "100%",
  padding: 0,
})

const ContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  textAlign: "left",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(3),
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main + "20",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  flexShrink: 0,
  [theme.breakpoints.up("sm")]: {
    width: 56,
    height: 56,
  },
}))

const StyledAddIcon = styled(Add)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  [theme.breakpoints.up("sm")]: {
    fontSize: 28,
  },
}))

const TextContainer = styled(Box)({
  flex: 1,
})

const CreateTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.125rem",
    marginBottom: theme.spacing(1),
  },
}))

const CreateDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
  },
}))

const CreateWorkspaceCard = ({ onCreateWorkspace, title, description }) => {
  return (
    <StyledCard onClick={onCreateWorkspace}>
      <StyledCardContent>
        <ContentContainer>
          <IconContainer>
            <StyledAddIcon />
          </IconContainer>
          <TextContainer>
            <CreateTitle component="h3">{title}</CreateTitle>
            <CreateDescription color="text.secondary">{description}</CreateDescription>
          </TextContainer>
        </ContentContainer>
      </StyledCardContent>
    </StyledCard>
  )
}

export default CreateWorkspaceCard
