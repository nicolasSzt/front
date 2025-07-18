import { styled, IconButton } from "@mui/material";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 6,
  color: theme.palette.mode === "dark" ? "#bbb" : "#757575",
}));

export default StyledIconButton;
