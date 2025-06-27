import styled from "@emotion/styled";

export const PrimaryButton = styled.button`
  background-color: #1976d2;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  &:active {
    transform: translateY(1px);
  }
`;
