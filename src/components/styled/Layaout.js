import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const FlexRow = styled(Box)`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "flex-start"};
  gap: ${(props) => props.gap || "16px"};
`;

export const FlexColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "flex-start"};
  gap: ${(props) => props.gap || "8px"};
`;

export const CardHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const StatsContainer = styled(Box)`
  display: flex;
  gap: 24px;
  margin-top: 8px;

`;

export const StatItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #718096;
`;

export const IconContainer = styled(Box)`
  border-radius: 50%;
  background-color: #f7fafc;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
