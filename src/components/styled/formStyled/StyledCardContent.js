import { CardContent, styled } from "@mui/material";

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "transparent",
  color: theme.palette.text.primary,
}));

export default StyledCardContent;
