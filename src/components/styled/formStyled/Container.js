import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Para centrar verticalmente en toda la pantalla */
  padding: 16px;

  /* Opcional: Limitar el ancho del contenido */
  & > * {
    width: 100%;
    max-width: 500px;
  }
`;
