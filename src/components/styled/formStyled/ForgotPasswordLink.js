import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const ForgotPasswordLink = styled(Link)`
  font-size: 0.875rem;
  color: #1976d2; /* azul MUI por defecto */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
