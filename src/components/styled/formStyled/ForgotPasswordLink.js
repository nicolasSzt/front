import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default ForgotPasswordLink;
