import styled from "@emotion/styled";

export const StyledCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 2px solid ${(props) => (props.isSelected ? "#1976d2" : "#edf2f7")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: ${(props) =>
    props.isSelected
      ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"};

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-color: ${(props) => (props.isSelected ? "#1976d2" : "#e2e8f0")};
  }
`;

export const CardContent = styled.div`
  padding: 24px;
`;

export const CreateWorkspaceCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #cbd5e0;
  }
`;

export const CreateWorkspaceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px;
`;
