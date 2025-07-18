import { Box } from "@mui/material";
import styled from "@emotion/styled";

const HeaderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

// Títulos con color que responde al tema
export const MainTitle = styled.h3`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 16px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;


const WorkspaceHeader = ({ title, subtitle}) => {
  return (
    <HeaderContainer>
      <MainTitle>{title}</MainTitle>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderContainer>
  );
};

export default WorkspaceHeader;
