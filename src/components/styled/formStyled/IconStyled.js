import { styled } from "@mui/material";

const IconStyled = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: 20,
  color: theme.palette.text.primary,
}));

export default IconStyled;
