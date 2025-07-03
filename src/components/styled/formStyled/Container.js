import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  padding: 16px;

  & > * {
    width: 100%;
    max-width: 500px;
  }
`;
