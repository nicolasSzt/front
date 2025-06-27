import styled from "@emotion/styled";

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 16px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #718096;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const WorkspaceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const WorkspaceDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-top: 4px;
`;

export const CreateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 16px;
`;

export const CreateDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  text-align: center;
  max-width: 400px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: #718096;
  text-align: center;
  margin-top: 48px;
`;

export const FooterLink = styled.a`
  color: #1976d2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
