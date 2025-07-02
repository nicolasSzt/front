import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const MainContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 48px 24px;
`;

export const ContentContainer = styled(Box)`
  max-width: 1200px;
  flex-direction: row;
  align-self: center;
  margin: 0 auto;
`;

export const Container = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;