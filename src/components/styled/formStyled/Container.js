import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 16,
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff", 
  color: theme.palette.text.primary,

  "& > *": {
    width: "100%",
    maxWidth: 500,
  },
}));

export default Container;
