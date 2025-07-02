import { MainTitle, Subtitle } from "@/components/styled/Typography";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const HeaderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const WorkspaceHeader = ({ title, subtitle }) => {
  return (
    <HeaderContainer>
      <MainTitle>{title}</MainTitle>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderContainer>
  );
};

export default WorkspaceHeader;
